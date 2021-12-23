module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){
    const Model = require('../models/user')
    Model.findOne({
        _id: req.body._id
    })
    .then(async function(userBeforeCut){
        let userInformationCutter = require('../functions/userInformationCutter')
        await userInformationCutter([userBeforeCut])
        .then((user) => {
            res.send({
                "user": user[0],
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
        })
    })
    .catch(next)
}