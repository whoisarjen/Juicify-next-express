module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	const Model = require('../models/workout_plan')
    Model.create(req.body.array).then(function(model){
        model = JSON.parse(JSON.stringify(model))
        for(let i=0; i<req.body.array.length; i++){
            model[i].exercises = JSON.parse(JSON.stringify(req.body.array[i].exercises))
        }
        res.send({
            model: model,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)

}