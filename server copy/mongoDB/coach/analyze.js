module.exports = (req) => {
    return new Promise(resolve => {

        const object = req.body.array[0]

        let allWeightsWeek1 = 0
        let qualityDaysWeek1 = 0
        let caloriesWeek1 = 0
        let allWeightsWeek2 = 0
        let qualityDaysWeek2 = 0
        let caloriesWeek2 = 0

        object.data.forEach((day, index) => {
            if (index < 14) { // Skip last day for weight
                if (day.weight > 0) {
                    if (index < 7) {
                        allWeightsWeek1 += day.weight;
                        qualityDaysWeek1++;
                    } else {
                        allWeightsWeek2 += day.weight;
                        qualityDaysWeek2++;
                    }
                }
            }
            if (index > 0) { // Skip first day for nutrition
                if (index < 8) {
                    if (day.nutrition_diary && day.nutrition_diary.length) {
                        day.nutrition_diary.forEach(meal => {
                            if (meal.calories) {
                                caloriesWeek1 += meal.calories
                            } else {
                                if (meal.proteins) {
                                    caloriesWeek1 += meal.proteins * 4
                                }
                                if (meal.carbs) {
                                    caloriesWeek1 += meal.carbs * 4
                                }
                                if (meal.fats) {
                                    caloriesWeek1 += meal.fats * 9
                                }
                                if (meal.ethanol) {
                                    caloriesWeek1 += meal.ethanol * 7
                                }
                            }
                        })
                    }
                } else {
                    if (day.nutrition_diary && day.nutrition_diary.length) {
                        day.nutrition_diary.forEach(meal => {
                            if (meal.calories) {
                                caloriesWeek2 += meal.calories
                            } else {
                                if (meal.proteins) {
                                    caloriesWeek2 += meal.proteins * 4
                                }
                                if (meal.carbs) {
                                    caloriesWeek2 += meal.carbs * 4
                                }
                                if (meal.fats) {
                                    caloriesWeek2 += meal.fats * 9
                                }
                                if (meal.ethanol) {
                                    caloriesWeek2 += meal.ethanol * 7
                                }
                            }
                        })
                    }
                }
            }
        })

        const avgWeekWeight1 = allWeightsWeek1 / qualityDaysWeek1
        const avgWeekWeight2 = allWeightsWeek2 / qualityDaysWeek2
        const diffrentInWeight = avgWeekWeight1 - avgWeekWeight2

        let avgWeekCalories = caloriesWeek1 / qualityDaysWeek1

        // If user decide to use token's macro over live data
        if (!object.isUseData) {
            avgWeekCalories = 0
            req.body.token.macronutrients.forEach(x => {
                avgWeekCalories += x.proteins * 4
                avgWeekCalories += x.carbs * 4
                avgWeekCalories += x.fats * 9
            })
            avgWeekCalories = parseInt(avgWeekCalories / 7)
        }

        const basicCalories = avgWeekCalories - diffrentInWeight * 7800 / 7

        const newCalories = basicCalories + (req.body.token.goal / 100 * avgWeekWeight1) * 7800 / 7

        const macro = require('./functions/macro')(req.body.token.kind_of_diet, object.age, req.body.token.sport_active, avgWeekWeight1, newCalories)

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
                goal: req.body.token.goal,
                kind_of_diet: req.body.token.kind_of_diet,
                sport_active: req.body.token.sport_active,
                activity: req.body.token.activity,
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