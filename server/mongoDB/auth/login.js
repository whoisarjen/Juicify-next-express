module.exports = (req, res, next) => {

    let Model = require('../models/user')
    Model.findOne({
        'login': req.body.login
    })
    .then(user => {
        if(!user) return res.status(400).send({error: 'Wrong password'})

        const bcrypt = require('bcrypt');
        const loadProduct = require("../functions/loadProduct")
        const loadExercise = require("../functions/loadExercise")
        bcrypt.compare(req.body.password, user.password, (err, respo) => {
            if(!respo) return res.status(400).send({error: 'Wrong password'})
            if(user.banned) return res.status(400).send({error: 'Your account has been banned'})

            const token = require('./createToken')([user])
            const refresh_token = require('./createRefreshToken')([user])
            Model = require('../models/workout_plan')
            Model.find({user_ID: user._id}).then(async function(workout_plan){
                if(workout_plan.length>0){
                    for(let i=0; i<workout_plan.length; i++){
                        for(let a=0; a<workout_plan[i].exercises.length; a++){
                            workout_plan[i].exercises[a] = await loadExercise(workout_plan[i].exercises[a])
                        }
                    }
                }
                Model = require('../models/product')
                Model.find({$and: [ { user_ID: user._id }, { deleted: { $exists: false } } ]}).then(function(product){
                    Model = require('../models/exercise')
                    Model.find({$and: [ { user_ID: user._id }, { deleted: { $exists: false } } ]}).then(function(exercise){
                        Model = require('../models/daily_measurement')
                        Model.find({
                            user_ID: user._id,
                            whenAdded: {
                                $gte: req.body.overDatePlusTheDate
                            }
                        })
                        .sort({whenAdded: -1})
                        .then(async function(daily_measurement){
                            if(daily_measurement.length>0){
                                for(let i=0; i<daily_measurement.length; i++){
                                    if(daily_measurement[i].nutrition_diary && daily_measurement[i].nutrition_diary.length>0){
                                        for(let a=0; a<daily_measurement[i].nutrition_diary.length; a++){
                                            if(!daily_measurement[i].nutrition_diary[a].calories) daily_measurement[i].nutrition_diary[a] = await loadProduct(daily_measurement[i].nutrition_diary[a])
                                        }
                                    }
                                    if(daily_measurement[i].workout_result && daily_measurement[i].workout_result.length>0){
                                        for(let a=0; a<daily_measurement[i].workout_result.length; a++){
                                            for(let b=0; b<daily_measurement[i].workout_result[a].results.length; b++){
                                                daily_measurement[i].workout_result[a].results[b] = await loadExercise(daily_measurement[i].workout_result[a].results[b])
                                            }
                                        }
                                    }
                                }
                            }
                            Model = require('../models/favourite_product')
                            Model.find({user_ID: user._id}).then(async function(favourite_product){
                                if(favourite_product.length>0){
                                    for(let i=0; i<favourite_product.length; i++){
                                        favourite_product[i] = await loadProduct(favourite_product[i])
                                    }
                                }
                                res.send({
                                    token,
                                    refresh_token,
                                    product,
                                    favourite_product,
                                    exercise,
                                    workout_plan,
                                    daily_measurement
                                });
                            }).catch(err => catchError(err))
                        }).catch(err => catchError(err))
                    }).catch(err => catchError(err))
                }).catch(err => catchError(err))
            }).catch(err => catchError(err))
        })

    })
    .catch(err => catchError(err))

    function catchError(err){
        console.log(`Error for user ${req.body.user_ID}: ${err}`)
        return res.status(400).send({error: 'Something went wrong'})
    }

}