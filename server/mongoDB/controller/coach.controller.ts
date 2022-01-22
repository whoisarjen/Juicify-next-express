import { Request, Response } from 'express'
import logger from '../../utils/logger';
import { changeUser } from '../service/user.service';
import { updateToken } from './session.controller';

export const createCoachHandler = async (req: Request, res: Response) => {
    try {
        let calories = 0

        if (res.locals.token.sex == false) {
            calories = parseInt((((9.99 * req.body.weight + 6.25 * res.locals.token.height - 4.92 * req.body.age - 161) * req.body.activity) + (req.body.goal / 100 * req.body.weight) * 7800 / 30).toString())
        } else {
            calories = parseInt((((9.99 * req.body.weight + 6.25 * res.locals.token.height - 4.92 * req.body.age + 5) * req.body.activity) + (req.body.goal / 100 * req.body.weight) * 7800 / 30).toString())
        }

        let macro = await handleDiet(req.body.kind_of_diet, req.body.age, req.body.sport_active, req.body.weight, calories)

        let array = []
        for (let i = 1; i < 8; i++) {
            array.push({
                'day': i,
                'proteins': macro.proteins,
                'carbs': macro.carbs,
                'fats': macro.fats
            })
        }

        const user = await changeUser({
            _id: res.locals.token._id,
            coach: (new Date(Date.parse(req.body.today) + 7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
            coach_analyze: true,
            goal: req.body.goal,
            kind_of_diet: req.body.kind_of_diet,
            sport_active: req.body.sport_active,
            activity: req.body.activity,
            macronutrients: array
        })

        const token = await updateToken(req, res, user)

        return res.send(token);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const analyzeCoachHandler = async (req: Request, res: Response) => {
    try {
        let allWeightsWeek1 = 0
        let qualityDaysWeek1 = 0
        let caloriesWeek1 = 0
        let allWeightsWeek2 = 0
        let qualityDaysWeek2 = 0

        req.body.data.forEach((day: any, index: number) => {
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
                        day.nutrition_diary.forEach((meal: any) => {
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
                }
            }
        })

        const avgWeekWeight1 = allWeightsWeek1 / qualityDaysWeek1
        const avgWeekWeight2 = allWeightsWeek2 / qualityDaysWeek2
        const diffrentInWeight = avgWeekWeight1 - avgWeekWeight2

        let avgWeekCalories = caloriesWeek1 / qualityDaysWeek1

        // If user decide to use token's macro over live data
        if (!req.body.isUseData) {
            avgWeekCalories = 0
            req.body.token.macronutrients.forEach((x: any) => {
                avgWeekCalories += x.proteins * 4
                avgWeekCalories += x.carbs * 4
                avgWeekCalories += x.fats * 9
            })
            avgWeekCalories = parseInt((avgWeekCalories / 7).toString())
        }

        const basicCalories = avgWeekCalories - diffrentInWeight * 7800 / 7

        const newCalories = basicCalories + (req.body.token.goal / 100 * avgWeekWeight1) * 7800 / 7

        let macro = await handleDiet(res.locals.token.kind_of_diet, req.body.age, res.locals.token.sport_active, avgWeekWeight1, newCalories)

        let array = []
        for (let i = 1; i < 8; i++) {
            array.push({
                'day': i,
                'proteins': macro.proteins,
                'carbs': macro.carbs,
                'fats': macro.fats
            })
        }

        const user = await changeUser({
            _id: res.locals.token._id,
            coach: (new Date(Date.parse(req.body.today) + 7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
            coach_analyze: true,
            goal: req.body.goal,
            kind_of_diet: req.body.kind_of_diet,
            sport_active: req.body.sport_active,
            activity: req.body.activity,
            macronutrients: array
        })

        const token = await updateToken(req, res, user)

        return res.send(token);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const handleDiet = async (kind_of_diet: number, age: number, isLifting: boolean, weight: number, calories: number) => {
    switch (kind_of_diet) {
        case 0:
            return await createBalancedDiet(age, isLifting, weight, calories)
        case 1:
            return await createKetogenicDiet(age, isLifting, weight, calories)
        default:
            logger.info(`Did not find option for kind of diet in macro. Was looking for "${kind_of_diet}"`)
            return {
                proteins: 0,
                carbs: 0,
                fats: 0
            }
    }
}

export const createBalancedDiet = async (age: number, isLifting: boolean, weight: number, calories: number) => {
    let object = {
        proteins: 0,
        carbs: 0,
        fats: 0
    }

    object.fats = calories * 0.25

    if (isLifting) {
        object.proteins = 1.6 * weight * 4
    } else {
        if (age < 18) {
            object.proteins = 0.8 * weight * 4
        } else if (age < 40) {
            object.proteins = 1.1 * weight * 4
        } else if (age < 65) {
            object.proteins = 1.3 * weight * 4
        } else {
            object.proteins = 1.5 * weight * 4
        }
    }

    object.carbs = calories - object.fats - object.proteins

    if (object.carbs < 160) {
        object.proteins += object.carbs - 160
        object.carbs = 160
    }

    object.proteins = parseInt((object.proteins / 4).toString())
    object.carbs = parseInt((object.carbs / 4).toString())
    object.fats = parseInt((object.fats / 9).toString())

    return object
}
export const createKetogenicDiet = async (age: number, isLifting: boolean, weight: number, calories: number) => {
    let object = {
        proteins: 0,
        carbs: 0,
        fats: 0
    }

    object.carbs = calories * 0.05

    // Atl 40g carbs
    if (object.carbs < 160) object.carbs = 160

    if (isLifting) {
        object.proteins = 1.6 * weight * 4
    } else {
        if (age < 18) {
            object.proteins = 0.8 * weight * 4
        } else if (age < 40) {
            object.proteins = 1.1 * weight * 4
        } else if (age < 65) {
            object.proteins = 1.3 * weight * 4
        } else {
            object.proteins = 1.5 * weight * 4
        }
    }

    object.fats = calories - object.carbs - object.proteins

    if (object.fats < calories * 0.7) {
        if (age < 18) {
            object.proteins = 0.8 * weight * 4
        } else if (age < 40) {
            object.proteins = 1.1 * weight * 4
        } else if (age < 65) {
            object.proteins = 1.3 * weight * 4
        } else {
            object.proteins = 1.5 * weight * 4
        }
        object.fats = calories - object.carbs - object.proteins
    }

    object.proteins = parseInt((object.proteins / 4).toString())
    object.carbs = parseInt((object.carbs / 4).toString())
    object.fats = parseInt((object.fats / 9).toString())

    return object
}