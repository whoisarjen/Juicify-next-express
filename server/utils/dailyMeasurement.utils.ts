import { DailyMeasurementProps } from "../mongoDB/models/dailyMeasurement.model"
import { getExercise } from "../mongoDB/service/exercise.service"
import { getProduct } from "../mongoDB/service/product.service"
import logger from "./logger"


export const loadDailyMeasurementMissingData = async (daily_measurement: DailyMeasurementProps) => {
    try {
        let response: any = {}
        if (daily_measurement && daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length) {
            const nutrition_diary = []
            for (let a = 0; a < daily_measurement.nutrition_diary.length; a++) {
                if (!daily_measurement.nutrition_diary[a].calories && daily_measurement.nutrition_diary[a].product_ID) {
                    const { meal, how_many, product_ID, _id } = daily_measurement.nutrition_diary[a]
                    nutrition_diary.push({ ...await getProduct(daily_measurement.nutrition_diary[a].product_ID), meal, how_many, product_ID, _id })
                } else {
                    nutrition_diary.push(daily_measurement.nutrition_diary[a])
                }
            }
            response = { ...response, nutrition_diary }
        }
        if (daily_measurement && daily_measurement.workout_result && daily_measurement.workout_result.length) {
            const workout_result = []
            for (let a = 0; a < daily_measurement.workout_result.length; a++) {
                if (daily_measurement.workout_result[a] && daily_measurement.workout_result[a].results && daily_measurement.workout_result[a].results.length) {
                    const results = []
                    for (let b = 0; b < daily_measurement.workout_result[a].results.length; b++) {
                        const { values, _id } = daily_measurement.workout_result[a].results[b]
                        results.push({ ...await getExercise(daily_measurement.workout_result[a].results[b]._id), ...(values && { values }), _id })
                    }
                    workout_result.push({
                        ...JSON.parse(JSON.stringify(daily_measurement.workout_result[a])),
                        results
                    })
                }
            }
            response = { ...response, workout_result }
        }

        return { ...JSON.parse(JSON.stringify(daily_measurement)), ...response }
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

export const connectTwoDailyMeasurements = async (objectExisting: DailyMeasurementProps, newObject: DailyMeasurementProps) => {
    try {
        let response = JSON.parse(JSON.stringify(objectExisting))
        if (!response._id && newObject._id) response._id = newObject._id
        if (newObject.weight && !response.weight) response.weight = newObject.weight
        if (newObject.weight_description && !response.weight_description) response.weight_description = newObject.weight_description
        if (newObject.neck && !response.neck) response.neck = newObject.neck
        if (newObject.shoulders && !response.shoulders) response.shoulders = newObject.shoulders
        if (newObject.chest && !response.chest) response.chest = newObject.chest
        if (newObject.biceps && !response.biceps) response.biceps = newObject.biceps
        if (newObject.waist && !response.waist) response.waist = newObject.waist
        if (newObject.hips && !response.hips) response.hips = newObject.hips
        if (newObject.thigh && !response.thigh) response.thigh = newObject.thigh
        if (newObject.calf && !response.calf) response.calf = newObject.calf
        if (newObject.water && !response.water) response.water = newObject.water

        if (newObject.nutrition_diary && !response.nutrition_diary) response.nutrition_diary = newObject.nutrition_diary
        else if (newObject.nutrition_diary && response.nutrition_diary) response.nutrition_diary = response.nutrition_diary.concat(newObject.nutrition_diary)

        if (newObject.workout_result && !response.workout_result) response.workout_result = newObject.workout_result
        else if (newObject.workout_result && response.workout_result) response.workout_result = response.workout_result.concat(newObject.workout_result) // NOT SURE IF IT WONT MAKE ISSUES

        return response
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}