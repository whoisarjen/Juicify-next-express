const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https')
const jwt = require("jsonwebtoken");
const tokenKEY = require("./requests/auth/tokenKEY")
const redis = require("redis");
const client = redis.createClient();
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
let user_ID = 0
let tokenGenerated = false;
let tokenRefreshGenerated = false;

const app = express();
app.use(cors())
app.use(bodyParser.json({limit: '5mb'}));

require('./connection')


// ----- ----- LOADING IMAGE ----- -----


app.use('/server/avatar', express.static(path.join(__dirname, "avatar")))


// ----- ----- CHECKING TOKEN ----- -----


// client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });

app.use('/server/requests/:what', async (req, res, next) => {
    tokenGenerated = false;
    tokenRefreshGenerated = false;
    if(!req.headers.authorization && (req.params.what == 'coach' || req.params.what == 'upload' || req.params.what == 'insert' || req.params.what == 'update' || req.params.what == 'delete')) return res.status(400).send({ error: 'banned' });
    if(req.headers.authorization){
        await tokenVeryification(req, res, next, req.headers.authorization);
    }
    next();
});

async function tokenVeryification(req, res, next, token){
    return new Promise(resolve => {
        jwt.verify(token, tokenKEY, async (err, user) => {
            console.log("tokenVeryification")
            console.log(user)
            if(user){
                user_ID = user._id
                req.body.user_ID = user._id
                req.body.token = user
                console.log(user._id)
                if(user.banned) return res.status(400).send({ error: 'banned' })
                if(req.body.array && (req.body.array.length>0)){
                    for(let i=0;i<req.body.array.length;i++){
                        if(req.body.array[i].name) req.body.array[i].name = req.body.array[i].name.trimEnd().trimStart()
                        req.body.array[i].user_ID = user._id
                        req.body.array[i].loginFromToken = user.login
                        req.body.array[i].login = user.login
                        req.body.array[i].users_roles_ID = user.users_roles_ID
                    }
                }else{
                    req.body.user_ID = user._id
                    req.body.loginFromToken = user.login
                    req.body.users_roles_ID = user.users_roles_ID
                }
            }else{
                tokenGenerated = false;
                tokenRefreshGenerated = false;
                await refreshToken(req, res, next, req.headers.refresh_jwt);
            }
            resolve()
        });
    })
}

async function refreshToken(req, res, next, refresh_jwt){
    return new Promise(resolve => {
        (async () => {
            try{
                jwt.verify(refresh_jwt, tokenKEY, async (err, user) => {
                    if(user){
                        console.log("SEARCHING FOR => " + user._id)
                        let Model = require('./requests/models/user')
                        Model.findOne({
                            _id: user._id
                        }).then(async function(item){
                            if(item){
                                if(!item.banned){
                                    tokenGenerated = require('./requests/auth/tokenGENERATOR')([item]);
                                    tokenRefreshGenerated = require('./requests/auth/tokenRefreshGENERATOR')([item]);
                                    console.log("REFRESH")
                                    console.log(tokenGenerated)
                                    await tokenVeryification(req, res, next, tokenGenerated);
                                }else return res.status(400).send({ error: 'banned' })
                            }else return res.status(400).send({ error: 'banned' })
                        })
                        .catch((err) => console.log(err))
                        .finally(() => resolve())
                    }else return res.status(400).send({ error: 'banned' }); 
                });
            }catch(err){
                console.log(err)
                return res.status(400).send({ error: 'banned' });
            }
        })()
    })
}


// ----- ----- UPLOADING IMAGES ----- -----


const filerFilter = function(req, file, cb){
    const allowedTypes = ['image/jpeg', 'image/png']
    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("only_images")
        error.code = 'LIMIT_FILE_TYPES'
        return cb(error, false)
    }
    cb(null, true)
}

const MAX_SIZE = 400000
const upload = multer({
    dest: "./avatar",
    filerFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

app.post('/server/requests/upload', upload.single('file'), async function (req, res, next){
    try{
        await sharp(req.file.path)
            .toFormat('jpeg')
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4',
                force: true
            })
            .toFile('./avatar/' + user_ID + ".jpg")

        fs.unlink(req.file.path, () => {
            return res.json({
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
        })
    }catch(err){
        return res.status(422).json({ error: 'something_went_wrong' })
    }
})


// ----- ----- ACTION CALLS TO MONGODB ----- -----


app.use('/server/requests/admin/:what/:where', async function (req, res, next){
    if(req.body.token.users_roles_ID === 9999){
        let test = await require('./requests/admin/' + req.params.what + '/' + req.params.where)(req, res, next, tokenGenerated, tokenRefreshGenerated)
        res.send(test)
    }else return res.status(400).send({ error: 'banned' });
})


app.use('/server/requests/:what/:where', async function (req, res, next){
    if(req.body.loginFromRoute && req.body.loginFromRoute != req.body.loginFromToken) return require('./requests/guest/' + req.params.where)(req, res, next) // Guest
    else if(req.params.what == 'find' && (req.params.where == 'exercise' || req.params.where == 'product')){ // Checking cache
        if(!req.body.key){ // Synchronization for own
            const answerFromDB = await require('./requests/' + req.params.what + '/' + req.params.where)(req, res, next, true)
            return res.send({ 
                answerFromDB: answerFromDB,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
    	}
        const nameOfLookingThing = req.body.key.toLowerCase() + "_" + req.params.where.toLowerCase()
    	const keyCheck = await getRedisKey(nameOfLookingThing)
    	if(keyCheck){
    		res.send({
                item: keyCheck,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
    	}else{
    		const answerFromDB = await require('./requests/' + req.params.what + '/' + req.params.where)(req, res, next)
    		client.set(nameOfLookingThing, JSON.stringify(answerFromDB), async () => {
            	await setRedisKeyTimeout(nameOfLookingThing)
            });
    		res.send({
                item: answerFromDB,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
    	}
    }else return require('./requests/' + req.params.what + '/' + req.params.where)(req, res, next, tokenGenerated, tokenRefreshGenerated)
})

app.use('/server/requests/:what', function (req, res, next){
    return require('./requests/' + req.params.what)(req, res, next, tokenGenerated, tokenRefreshGenerated)
})

app.use(function(err, req, res, next){
    if(err.code == 'LIMIT_FILE_TYPES') return res.status(422).json({ error: 'only_images' })
    if(err.code == 'LIMIT_FILE_SIZE') return res.status(422).json({ error: 'file_is_too_big' })
    res.send({error: err.message})
})

const server = https.createServer({
    key: fs.readFileSync('./../../../etc/letsencrypt/live/juicify.app/privkey.pem'),
    cert: fs.readFileSync('./../../../etc/letsencrypt/live/juicify.app/fullchain.pem')
},app).listen(4000,()=>{
    console.log("Listing on port 4000")
})


// ----- ----- REDIS ----- -----


async function getRedisKey(key){
    return new Promise(resolve => {
        client.get(key, function(err, reply){
        	if(!reply) return resolve(false)
            resolve(JSON.parse(reply));
        });
    })
}

async function setRedisKeyTimeout(key){
    return new Promise(resolve => {
        (async () => {
            client.expire(key, 60 * 60 * 24, () => { // 24h hold
                resolve();
            });
        })()
    })
}