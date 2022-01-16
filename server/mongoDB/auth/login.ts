import loadProduct from '../load/loadProduct'
import loadExercise from '../load/loadExercise'
import handleError from '../functions/handleError'
import tokenGENERATOR from './createToken'
import tokenRefreshGENERATOR from './createRefreshToken'
import bcrypt from 'bcrypt';
import userModel from '../models/user'
import workoutPlanModel from '../models/workout_plan'
import productModel from '../models/product'
import exerciseModel from '../models/exercise'
import dailyMeasurementModel from '../models/daily_measurement'

export default (req: any, res: any) => {

	userModel.findOne({
		'login': req.body.login
	})
		.then((user: any) => {
			if (!user) {
				return res.status(404).send({ error: 'Wrong password' })
			} else {
				bcrypt.compare(req.body.password, user.password, (error: any, response: any) => {
					if (!response) {
						return res.status(404).send({ error: 'Wrong password' })
					} else if (user.banned) {
						return res.status(400).send({ error: 'Your account has been banned' })
					} else {
						const token = tokenGENERATOR([user])
						const refresh_token = tokenRefreshGENERATOR([user])
						workoutPlanModel.find({
							user_ID: user._id
						})
							.then(async (RES_workout_plan: any) => {
								const workout_plan = JSON.parse(JSON.stringify(RES_workout_plan))
								if (workout_plan.length) {
									for (let i = 0; i < workout_plan.length; i++) {
										for (let a = 0; a < workout_plan[i].exercises.length; a++) {
											workout_plan[i].exercises[a] = await loadExercise(RES_workout_plan[i].exercises[a])
										}
									}
								}
								productModel.find({
									$and: [
										{
											user_ID: user._id
										},
										{
											deleted:
											{
												$exists: false
											}
										}
									]
								})
									.then((product: any) => {
										exerciseModel.find({
											$and: [
												{
													user_ID: user._id
												},
												{
													deleted:
													{
														$exists: false
													}
												}
											]
										})
											.then((exercise: any) => {
												dailyMeasurementModel.find({
													user_ID: user._id,
													whenAdded: {
														$gte: req.body.overDatePlusTheDate
													}
												})
													.sort({ "whenAdded": -1 })
													.then(async (RES_daily_measurement: any) => {
														const daily_measurement = JSON.parse(JSON.stringify(RES_daily_measurement))
														if (daily_measurement.length) {
															for (let i = 0; i < daily_measurement.length; i++) {
																if (daily_measurement[i].nutrition_diary && daily_measurement[i].nutrition_diary.length) {
																	for (let a = 0; a < daily_measurement[i].nutrition_diary.length; a++) {
																		if (!daily_measurement[i].nutrition_diary[a].calories) {
																			daily_measurement[i].nutrition_diary[a] = await loadProduct(RES_daily_measurement[i].nutrition_diary[a])
																		}
																	}
																}
																if (daily_measurement[i].workout_result && daily_measurement[i].workout_result.length) {
																	for (let a = 0; a < daily_measurement[i].workout_result.length; a++) {
																		for (let b = 0; b < daily_measurement[i].workout_result[a].results.length; b++) {
																			daily_measurement[i].workout_result[a].results[b] = await loadExercise(RES_daily_measurement[i].workout_result[a].results[b])
																		}
																	}
																}
															}
														}
														res.send({
															token,
															refresh_token,
															product,
															exercise,
															workout_plan,
															daily_measurement
														});
													}).catch((err: any) => handleError(err, 'login'))
											}).catch((err: any) => handleError(err, 'login'))
									}).catch((err: any) => handleError(err, 'login'))
							}).catch((err: any) => handleError(err, 'login'))
					}
				});
			}
		}).catch((err: any) => handleError(err, 'login'))

}