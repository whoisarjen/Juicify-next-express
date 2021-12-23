module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	const Model = require('../models/message')
    Model.create(req.body.array).then(function(model){
        res.send({
            model: model,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)
}