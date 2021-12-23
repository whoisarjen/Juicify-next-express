module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){
    const Model = require('../models/user')
    Model.find({
        login:{'$regex' : req.body.key, '$options' : 'i'}
    })
    .limit(10)
    .sort({ l: 1 })
    .then(async function(arrayWithUsers){
        let userInformationCutter = require('../functions/userInformationCutter')
        await userInformationCutter(arrayWithUsers)
        .then((user) => {
            res.send({
                "user": user,
                "item": user,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
        })
    })
    .catch(next)
}