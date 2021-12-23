const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){
    
    const Model = require('../models/daily_measurement')
    if(req.body.keyToFindSpecificObject && req.body.keyToFindSpecificObject != '1970-01-01T00:00:00.000Z'){
        Model.findOne({
            user_ID: req.body.user_ID,
            whenAdded: req.body.keyToFindSpecificObject
        })
        .then(async function(item){
            if(item && item.nutrition_diary && item.nutrition_diary.length>0){
                for(let i=0; i<item.nutrition_diary.length; i++){
                    item.nutrition_diary[i] = await loadProduct(item.nutrition_diary[i])
                }
            }
            if(item.workout_result && item.workout_result.length>0){
                for(let a=0; a<item.workout_result.length; a++){
                    for(let b=0; b<item.workout_result[a].results.length; b++){
                        item.workout_result[a].results[b] = await loadExercise(item.workout_result[a].results[b])
                    }
                }
            }
            res.send({
                item: item,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
        }).catch(next)
    }else{
        if(req.body.underDatePlusTheDate){
            Model.find({
                user_ID: req.body.user_ID,
                whenAdded: {
                    $lt: req.body.underDatePlusTheDate
                }
            })
            .sort({"whenAdded": -1})
            .limit(req.body.limitOfResults)
            .then(async function(item){
                if(item.length>0){
                    for(let i=0; i<item.length; i++){
                        if(item[i].nutrition_diary && item[i].nutrition_diary.length>0){
                            for(let a=0; a<item[i].nutrition_diary.length; a++){
                                item[i].nutrition_diary[a] = await loadProduct(item[i].nutrition_diary[a])
                            }
                        }
                        if(item[i].workout_result && item[i].workout_result.length>0){
                            for(let a=0; a<item[i].workout_result.length; a++){
                                for(let b=0; b<item[i].workout_result[a].results.length; b++){
                                    item[i].workout_result[a].results[b] = await loadExercise(item[i].workout_result[a].results[b])
                                }
                            }
                        }
                    }
                }
                res.send({
                    item: item,
                    tokenGenerated: tokenGenerated,
                    tokenRefreshGenerated: tokenRefreshGenerated
                })
            }).catch(next)
        }else{
            Model.find({
                user_ID: req.body.user_ID,
                whenAdded: {
                    $gte: req.body.overDatePlusTheDate
                }
            })
            .sort({"whenAdded": -1})
            .limit(req.body.limitOfResults)
            .then(async function(item){
                if(item.length>0){
                    for(let i=0; i<item.length; i++){
                        if(item[i].nutrition_diary && item[i].nutrition_diary.length>0){
                            for(let a=0; a<item[i].nutrition_diary.length; a++){
                                item[i].nutrition_diary[a] = await loadProduct(item[i].nutrition_diary[a])
                            }
                        }
                        if(item[i].workout_result && item[i].workout_result.length>0){
                            for(let a=0; a<item[i].workout_result.length; a++){
                                for(let b=0; b<item[i].workout_result[a].results.length; b++){
                                    item[i].workout_result[a].results[b] = await loadExercise(item[i].workout_result[a].results[b])
                                }
                            }
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
    }

}