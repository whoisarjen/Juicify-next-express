module.exports = async function(req, res, next){

    const Model = require('../models/user')
    const loadExercise = require("../functions/loadExercise")
    Model.findOne({login:{'$regex' : req.body.loginFromRoute, '$options' : 'i'}}).then( async function(userBeforeCut){
        if(userBeforeCut){
            if(parseInt(userBeforeCut.public_profile) > 0){
                const userInformationCutter = require('../functions/userInformationCutter') // Cutting extra value
                await userInformationCutter([userBeforeCut])
                .then((user) => {
                    user = user[0]
                    const Model2 = require('../models/workout_plan')
                    if(req.body.keyToFindSpecificObject){ // Checking if searching for specific object
                        Model2.findOne({
                            "_id": req.body.keyToFindSpecificObject,
                            "user_ID": user._id
                        })
                        .then(async function(item){
                            item = JSON.parse(JSON.stringify(item))
                            for(let a=0; a<item.exercises.length; a++){
                                item.exercises[a] = await loadExercise(item.exercises[a])
                            }
                            res.send({
                                "user": user,
                                "item": item
                            })
                        })
                        .catch(next)
                    }else{
                        Model2.find({
                            "user_ID": user._id
                        })
                        .limit(req.body.limitOfResults)
                        .then(async function(item){
                            item = JSON.parse(JSON.stringify(item))
                            if(item.length>0){
                                for(let i=0; i<item.length; i++){
                                    for(let a=0; a<item[i].exercises.length; a++){
                                        item[i].exercises[a] = await loadExercise(item[i].exercises[a])
                                    }
                                }
                            }
                            res.send({
                                "user": user,
                                "item": item
                            })
                        })
                        .catch(next)
                    }
                })
            }else res.status(403).send({ error: 403 })
        }else res.status(404).send({ error: 404 })
    }).catch(next)

}