module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

    const Model = require('../models/workout_plan')
    const loadExercise = require("../functions/loadExercise")
    Model.find({ user_ID: req.body.user_ID }).then(async function(item){
        item = JSON.parse(JSON.stringify(item))
        if(item.length>0){
            for(let i=0; i<item.length; i++){
                for(let a=0; a<item[i].exercises.length; a++){
                    item[i].exercises[a] = await loadExercise(item[i].exercises[a])
                }
            }
        }
        res.send({
            item: item,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)
    
}