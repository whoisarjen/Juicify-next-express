module.exports = async function(req, res, next){

    const Model = require('../models/user')
    Model.findOne({login:{'$regex' : req.body.loginFromRoute, '$options' : 'i'}}).then( async function(objectWithUser){
        if(objectWithUser){
            if(parseInt(objectWithUser.public_profile) > 0){
                const userInformationCutter = require('../functions/userInformationCutter')
                await userInformationCutter([objectWithUser])
                .then((user) => {
                    res.send({
                        "user": user[0],
                        "item": user[0]
                    })
                })
            }else res.status(403).send({ error: 403 })
        }else res.status(404).send({ error: 404 })
    }).catch(next)

}