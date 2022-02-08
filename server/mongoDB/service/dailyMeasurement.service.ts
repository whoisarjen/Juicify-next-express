import { DocumentDefinition } from 'mongoose'
import { DailyMeasurementModel, DailyMeasurementProps } from '../models/dailyMeasurement.model'
import { UserProps } from '../models/user.model'
import { getProduct } from './product.service'
import { getExercise } from './exercise.service'
import logger from '../../utils/logger'

export const createDailyMeasurement = async (input: DocumentDefinition<Array<DailyMeasurementProps>>) => {
    try {
        let DailyMeasurementCorrect = []
        const DailyMeasurements = await DailyMeasurementModel.create(input)
        for (let i = 0; i < DailyMeasurements.length; i++) {
            DailyMeasurementCorrect.push(await loadDailyMeasurementMissingData(DailyMeasurements[i]))
        }
        return DailyMeasurementCorrect
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

export const changeDailyMeasurement = async (array: Array<DailyMeasurementProps>) => {
    console.log('change', array)
    try {
        let newArray = []
        for (let i = 0; i < array.length; i++) {
            const newDaily = await DailyMeasurementModel.findOneAndReplace({
                "_id": array[i]._id,
                "user_ID": array[i].user_ID
            },
                array[i],
                { returnOriginal: false }
            )
            console.log('newDaily', newDaily)
            newArray.push(await loadDailyMeasurementMissingData(newDaily))
        }
        console.log('newArray', newArray)
        return newArray
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

export const getDryDailyMeasurement = async (input: DocumentDefinition<DailyMeasurementProps>) => {
    try {
        const DailyMeasurement = await DailyMeasurementModel.findOne(input)
        const DailyMeasurementCorrect = await loadDailyMeasurementMissingData(DailyMeasurement)
        return DailyMeasurementCorrect
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

export const getDailyMeasurement = async (input: DocumentDefinition<DailyMeasurementProps>) => {
    try {
        const DailyMeasurement = await getDryDailyMeasurement(input)
        const DailyMeasurementCorrect = await loadDailyMeasurementMissingData(DailyMeasurement)
        return DailyMeasurementCorrect
    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

export const getUserDailyMeasurements = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const daily_measurement = await DailyMeasurementModel.find({
            user_ID: token._id,
            whenAdded: {
                $gte: new Date((new Date().setDate((new Date().getDate() - parseInt(process.env.SUPPORTED_DAYS as string)))))
            }
        })

        if (daily_measurement.length) {
            for (let i = 0; i < daily_measurement.length; i++) {
                daily_measurement[i] = await loadDailyMeasurementMissingData(daily_measurement[i])
            }
        }

        return daily_measurement

    } catch (error: any) {
        logger.error(error)
        throw new Error(error)
    }
}

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