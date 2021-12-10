module.exports = function(req, res, next, tokenGenerated, tokenRefreshGenerated){

    if(tokenGenerated && tokenRefreshGenerated) res.send({ jwt: tokenGenerated, refresh_jwt: tokenRefreshGenerated });
    let Model = require('../models/user')
    Model.findOne({
        '_id': req.body.user_ID
    }).then(function(item){
        if(item){
            if(!item.banned){
                const jwt = require('./tokenGENERATOR')([item])
                const refresh_jwt = require('./tokenRefreshGENERATOR')([item])
                res.send({
                	jwt: jwt,
                    refresh_jwt: refresh_jwt
                });
            }else return res.status(400).send({ error: 'banned' })
        }else return res.status(404).send({error: 'wrong_password'})
    }).catch(next)

}