const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require("socket.io");
const fs = require('fs')
const https = require('https')
const jwt = require("jsonwebtoken");
const tokenKEY = require("./requests/auth/tokenKEY");
const redis = require("redis");
const client = redis.createClient();

const spam_timer = 100 * 1000 // ms
const spam_counter_max = 100

// App setup
const app = express();
app.use(cors())
app.use(bodyParser.json({limit: '5mb'}));

const server = https.createServer({
    key: fs.readFileSync('../../../etc/letsencrypt/live/juicify.app/privkey.pem'),
    cert: fs.readFileSync('../../../etc/letsencrypt/live/juicify.app/fullchain.pem')
},app).listen(5000,()=>{
    console.log("Listing on port 5000")
})

// Socket setup
const io = socket(server, {
    cors: {
        origin: '*',
    }
});


// client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });


// ----- ZMIENNE SOCKETA ----- 


let versionOFapplication = 0;
let lastUpdated = {}


// ----- FUNKCJE SOCKETA -----


// Tworzenie informacji o potrzebie synchronizacji
async function putDeviceToAllOflineUsersToSynchro(value){
    return new Promise(resolve => {
        (async () => {
            resolve(await setUsersRedis(value.token, value.where, value.time))
        })()
    })
}

async function createUsersRedis(_id, time_in_ms){
    return new Promise(resolve => {
        (async () => {
            client.set(_id, JSON.stringify({
                'product': time_in_ms,
                'favourite_product': time_in_ms,
                'exercise': time_in_ms,
                'workout_plan': time_in_ms,
                'settings': time_in_ms,
                'daily_measurement': time_in_ms,
                'message': {
                    'last_message_time': time_in_ms,
                    'number_of_messages': 1
                },
                'spam': {
                    'count': 1,
                    'time': time_in_ms
                },
                'logout': 0,
                'refresh': 0
            }), async () => {
            	await setUsersRedisTimeout(_id)
                resolve(await getUsersRedis(_id));
            });
        })()
    })
}

async function getUsersRedis(_id){
    return new Promise(resolve => {
        client.get(_id, function(err, reply){
            if(!reply) return resolve(false)
            resolve(JSON.parse(reply));
        });
    })
}

async function setUsersRedis(_id, where, time, insideWhere){
    return new Promise(resolve => {
        (async () => {
            let object = await getUsersRedis(_id)
            if(object){
                if(insideWhere) object[where][insideWhere] = time
                else object[where] = time

                if(time > parseInt(object['spam']['time']) + spam_timer){
                    object['spam']['count'] = 1
                    object['spam']['time'] = time
                }else{
                    object['spam']['count'] += 1
                }

                client.set(_id, JSON.stringify(object), async () => {
                	await setUsersRedisTimeout(_id)
                    resolve(object['spam']['count']);
                });
            }else{
                let response = await createUsersRedis(_id, time)
                resolve(response['spam']['count'])
            }
        })()
    })
}

async function setUsersRedisTimeout(_id){
    return new Promise(resolve => {
        (async () => {
            client.expire(_id, 60 * 60 * 24 * 2, () => {
                resolve();
            });
        })()
    })
}


// ----- OBSŁUGA SOCKETA ----- 


io.on("connection", async (socket) => {


    // ----- ----- SOCKET USES REFRESH TOKEN AS MAIN TOKEN ----- -----


    if(socket.handshake.query && socket.handshake.query._id){
        socket.join(socket.handshake.query._id);
        let lastUpdated = await getUsersRedis(socket.handshake.query._id)
        if(!lastUpdated) lastUpdated = await createUsersRedis(socket.handshake.query._id, socket.handshake.query.time)
        socket.emit('needToUpdateAfterOffline', {
            "lastUpdated": lastUpdated,
            "versionOFapplication": versionOFapplication
        })
    }

    // ----- CHANGES IN ACCOUNT -----

    // socket.on('tellAboutSeeingMessages', async (value) => {
    //     await setUsersRedis(value.token, 'message', 0, 'number_of_messages')
    //     socket.to(value.token).emit('SynchronizationFromDiffDevice', {
    //         "number_of_messages": 0
    //     });
    // })

    socket.on('NEWversionOFapplication', function (value){
    	const user = jwt.verify(value.token, tokenKEY);
    	if(user.users_roles_ID === 9999) versionOFapplication = value;
    })

    socket.on('tellAboutSynchronization', async (value) => {
        if(value && value.token){
            try {
                let data = JSON.parse(JSON.stringify(value))
                jwt.verify(value.token, tokenKEY, async function(err, decoded) {
                    data.token = decoded._id
                    let spam_counter = await putDeviceToAllOflineUsersToSynchro(data)
                    socket.join(data.token);
                    socket.to(data.token).emit('SynchronizationFromDiffDevice', data);

                    // Spammer will get logout
                    if(spam_counter >= spam_counter_max){
                        await setUsersRedis(data.token, 'logout', new Date().getTime() + 2000)
                        let lastUpdated = await getUsersRedis(data.token)
                        if(!lastUpdated) lastUpdated = await createUsersRedis(data.token, data.time)
                        socket.emit('needToUpdateAfterOffline', {
                            "lastUpdated": lastUpdated,
                            "versionOFapplication": versionOFapplication
                        })
                    }
                });
            }catch(err){
                console.log(err)
            }
        }
    })

    // ----- ADMIN'S FUNCTIONS -----

    socket.on('newVersionOfApplication', function(value) {
        if(value.token){
            try{
                const user = jwt.verify(value.token, tokenKEY); // Only connection needs token's veryfication. Rest calls are protected by server's verification
                if(user.users_roles_ID == 9999) versionOFapplication = new Date().getTime()
            }catch{
                (async () => {
                    await logoutOnError(socket)
                })()
            }
        }
    })

    socket.on('logoutAllUsers', function (value) {
    	if(value.token){
            try{
                const user = jwt.verify(value.token, tokenKEY); // Only connection needs token's veryfication. Rest calls are protected by server's verification
                if(user.users_roles_ID == 9999){
                	const time = new Date().getTime() 
                    client.keys('*', async (err, keys) => {
                        for(let i = 0, len = keys.length; i < len; i++){
                            await setUsersRedis(keys[i], 'logout', time)
                        }
                    });  
                }
            }catch{
                (async () => { await logoutOnError() })()
            }
        }
    })

    socket.on('logoutUser', async (value) => {
    	if(value.token){
            try{
                const user = jwt.verify(value.token, tokenKEY); // Only connection needs token's veryfication. Rest calls are protected by server's verification
                if(user.users_roles_ID == 9999){
                    await setUsersRedis(value.user, 'logout', new Date().getTime())
                }
            }catch{
                (async () => { await logoutOnError() })()
            }
        }
    })

    async function logoutOnError(){
        return new Promise(resolve => {
            (async () => {
                socket.emit('needToUpdateAfterOffline', {
                    "lastUpdated": { "logout": parseInt(new Date().getTime()) + 10000},
                    "versionOFapplication": versionOFapplication
                })
                resolve();
            })()
        })
    }

});