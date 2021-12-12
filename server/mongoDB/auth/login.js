const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")
const handleError = require("../functions/handleError")

module.exports = function (req, res) {

	let Model = require('../models/user')
	Model.findOne({
		'login': req.body.login
	}).then(function (user) {
		if (!user) return res.status(404).send({ error: 'Wrong password' })
		const bcrypt = require('bcrypt');
		bcrypt.compare(req.body.password, user.password, function (error, response) {
			if (!response) return res.status(404).send({ error: 'Wrong password' })
			if (user.banned) return res.status(400).send({ error: 'Your account has been banned' })
			const token = require('./tokenGENERATOR')([user])
			const refresh_token = require('./tokenRefreshGENERATOR')([user])
			Model = require('../models/workout_plan')
			Model.find({ user_ID: user._id }).then(async function (workout_plan) {
				if (workout_plan.length > 0) {
					for (let i = 0; i < workout_plan.length; i++) {
						for (let a = 0; a < workout_plan[i].exercises.length; a++) {
							workout_plan[i].exercises[a] = await loadExercise(workout_plan[i].exercises[a])
						}
					}
				}
				Model = require('../models/product')
				Model.find({ $and: [{ user_ID: user._id }, { deleted: { $exists: false } }] }).then(function (product) {
					Model = require('../models/exercise')
					Model.find({ $and: [{ user_ID: user._id }, { deleted: { $exists: false } }] }).then(function (exercise) {
						Model = require('../models/daily_measurement')
						Model.find({
							user_ID: user._id,
							whenAdded: {
								$gte: req.body.overDatePlusTheDate
							}
						})
							.sort({ "whenAdded": -1 })
							.then(async function (daily_measurement) {
								if (daily_measurement.length > 0) {
									for (let i = 0; i < daily_measurement.length; i++) {
										if (daily_measurement[i].nutrition_diary && daily_measurement[i].nutrition_diary.length > 0) {
											for (let a = 0; a < daily_measurement[i].nutrition_diary.length; a++) {
												if (!daily_measurement[i].nutrition_diary[a].calories) daily_measurement[i].nutrition_diary[a] = await loadProduct(daily_measurement[i].nutrition_diary[a])
											}
										}
										if (daily_measurement[i].workout_result && daily_measurement[i].workout_result.length > 0) {
											for (let a = 0; a < daily_measurement[i].workout_result.length; a++) {
												for (let b = 0; b < daily_measurement[i].workout_result[a].results.length; b++) {
													daily_measurement[i].workout_result[a].results[b] = await loadExercise(daily_measurement[i].workout_result[a].results[b])
												}
											}
										}
									}
								}
								Model = require('../models/favourite_product')
								Model.find({ user_ID: user._id }).then(async function (favourite_product) {
									if (favourite_product.length > 0) {
										for (let i = 0; i < favourite_product.length; i++) {
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
								}).catch(err => handleError(err, 'login'))
							}).catch(err => handleError(err, 'login'))
					}).catch(err => handleError(err, 'login'))
				}).catch(err => handleError(err, 'login'))
			}).catch(err => handleError(err, 'login'))
		});
	}).catch(err => handleError(err, 'login'))

}