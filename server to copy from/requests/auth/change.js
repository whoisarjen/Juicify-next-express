module.exports = async function(req, res, next){
    
    const Model = require('../models/user')

    if(req.body.array[0]._id) delete req.body.array[0]._id
    if(req.body.array[0].login) delete req.body.array[0].login
    if(req.body.array[0].email) delete req.body.array[0].email
    if(req.body.array[0].users_roles_ID) delete req.body.array[0].users_roles_ID
    if(req.body.array[0].registered) delete req.body.array[0].registered
    if(req.body.array[0].banned) delete req.body.array[0].banned

    async function hashIT(password){
        return new Promise(res => {
            const bcrypt = require('bcrypt');
            bcrypt.hash(password, 10, function(err, hash) {
                res( hash )
            })
        })
    }

    if(req.body.array[0].password && req.body.array[0].password != req.body.token.password) req.body.array[0].password = await hashIT(req.body.array[0].password) 

    Model.findOneAndUpdate({
        _id: req.body.user_ID
    },
    { $set: req.body.array[0] },
    { new: true }
    ).then((response) => {
        if(response){
            response = JSON.parse(JSON.stringify(response))
            response.password = req.body.array[0].password || req.body.token.password
            const jwt = require('../../../server to copy from/requests/auth/tokenGENERATOR')([response])
            const refresh_jwt = require('../../../server to copy from/requests/auth/tokenRefreshGENERATOR')([response])
            res.send({ 
                jwt: jwt,
                refresh_jwt: refresh_jwt
            });
        }else return res.status(404).send({error: 'wrong_password'})
    })
    .catch(next)

}