const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = function(req, res, next){

    let Model = require('../models/user')
    Model.findOne({
        'login': req.body.user_ID
    }).then(function(item){
        if(item){
            const bcrypt = require('bcrypt');
            bcrypt.compare(req.body.password, item.password, function(err, respo) {
                if(respo){
                    if(!item.banned){
                        const jwt = require('./tokenGENERATOR')([item])
                        const refresh_jwt = require('./tokenRefreshGENERATOR')([item])
						Model = require('../models/workout_plan')
						Model.find({user_ID: item._id}).then(async function(workout_plan){
							if(workout_plan.length>0){
								for(let i=0; i<workout_plan.length; i++){
									for(let a=0; a<workout_plan[i].exercises.length; a++){
										workout_plan[i].exercises[a] = await loadExercise(workout_plan[i].exercises[a])
									}
								}
							}
							Model = require('../models/product')
							Model.find({$and: [ { user_ID: item._id }, { deleted: { $exists: false } } ]}).then(function(product){
								Model = require('../models/exercise')
								Model.find({$and: [ { user_ID: item._id }, { deleted: { $exists: false } } ]}).then(function(exercise){
									Model = require('../models/daily_measurement')
						            Model.find({
						                user_ID: item._id,
						                whenAdded: {
						                    $gte: req.body.overDatePlusTheDate
						                }
						            })
						            .sort({"whenAdded": -1})
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
									    Model.find({user_ID: item._id}).then(async function(favourite_product){
							            	if(favourite_product.length>0){
							            		for(let i=0; i<favourite_product.length; i++){
							            			favourite_product[i] = await loadProduct(favourite_product[i])
							            		}
							            	}
					                        res.send({
					                        	"jwt": jwt,
					                        	"refresh_jwt": refresh_jwt,
					                        	"product": product,
					                        	"favourite_product": favourite_product,
					                        	"exercise": exercise,
					                        	"workout_plan": workout_plan,
					                        	"daily_measurement": daily_measurement
					                        });
						            	}).catch(next)
						            }).catch(next)
						        }).catch(next)
						    }).catch(next)
						}).catch(next)
                    }else return res.status(400).send({ error: 'banned' })
                }else return res.status(404).send({error: 'wrong_password'})
            });
        }else return res.status(404).send({error: 'wrong_password'})
    }).catch(next)

}