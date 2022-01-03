module.exports = function (req) {
	return new Promise(resolve => {
		let object = req.body.array[0]
		let token = req.body.token
		let calories = 0

		if (token.sex == false) {
			calories = parseInt(((9.99 * object.weight + 6.25 * token.height - 4.92 * object.age - 161) * object.activity) + (object.goal / 100 * object.weight) * 7800 / 30)
		} else {
			calories = parseInt(((9.99 * object.weight + 6.25 * token.height - 4.92 * object.age + 5) * object.activity) + (object.goal / 100 * object.weight) * 7800 / 30)
		}

		let macro = require('./functions/macro')(object.kind_of_diet, object.age, object.sport_active, object.weight, calories)

		let array = []
		for (let i = 1; i < 8; i++) {
			array.push({
				'day': i,
				'proteins': macro.proteins,
				'carbs': macro.carbs,
				'fats': macro.fats
			})
		}

		const Model = require('../models/user')
		Model.findOneAndUpdate(
			{
				"_id": req.body.user_ID
			},
			{
				coach: (new Date(Date.parse(object.today) + 7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
				coach_analyze: true,
				goal: object.goal,
				kind_of_diet: object.kind_of_diet,
				sport_active: object.sport_active,
				activity: object.activity,
				macronutrients: array
			},
			{
				new: true
			}
		).then((user) => {
			const token = require('../auth/tokenGENERATOR')([user])
			const refresh_token = require('../auth/tokenRefreshGENERATOR')([user])
			resolve({
				token,
				refresh_token
			})
		})
	})


}