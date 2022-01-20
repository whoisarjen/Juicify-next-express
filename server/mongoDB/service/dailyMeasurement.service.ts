import { DocumentDefinition } from 'mongoose'
import { DailyMeasurementModel, DailyMeasurementProps } from '../models/dailyMeasurement.model'
import { UserProps } from '../models/user.model'
import config from 'config'
import { getProduct } from './product.service'
import { getExercise } from './exercise.service'

export const createDailyMeasurement = async (input: DocumentDefinition<Array<DailyMeasurementProps>>) => {
    try {
        const DailyMeasurement = await DailyMeasurementModel.create(input)
        return DailyMeasurement
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeDailyMeasurement = async (array: Array<DailyMeasurementProps>) => {
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
            newArray.push(await loadDailyMeasurementMissingData(newDaily))
        }
        return newArray
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getDryDailyMeasurement = async (input: DocumentDefinition<DailyMeasurementProps>) => {
    try {
        const DailyMeasurement = await DailyMeasurementModel.findOne(input)
        return DailyMeasurement
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getDailyMeasurement = async (input: DocumentDefinition<DailyMeasurementProps>) => {
    try {
        const DailyMeasurement = await getDryDailyMeasurement(input)
        const DailyMeasurementCorrect = await loadDailyMeasurementMissingData(DailyMeasurement)
        return DailyMeasurementCorrect
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserDailyMeasurements = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const daily_measurement = await DailyMeasurementModel.find({
            user_ID: token._id,
            whenAdded: {
                $gte: new Date((new Date().setDate((new Date().getDate() - config.get<number>('numberSupportedDays')))))
            }
        })

        if (daily_measurement.length) {
            for (let i = 0; i < daily_measurement.length; i++) {
                daily_measurement[i] = await loadDailyMeasurementMissingData(daily_measurement[i])
            }
        }

        return daily_measurement

    } catch (error: any) {
        throw new Error(error)
    }
}

export const loadDailyMeasurementMissingData = async (daily_measurement: DailyMeasurementProps) => {
    const nutrition_diary = []
    if (daily_measurement && daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length) {
        for (let a = 0; a < daily_measurement.nutrition_diary.length; a++) {
            if (!daily_measurement.nutrition_diary[a].calories && daily_measurement.nutrition_diary[a].product_ID) {
                const { meal, how_many, product_ID } = daily_measurement.nutrition_diary[a]
                nutrition_diary.push({ ...await getProduct(daily_measurement.nutrition_diary[a].product_ID), meal, how_many, product_ID })
            } else {
                nutrition_diary.push(daily_measurement.nutrition_diary[a])
            }
        }
    }
    const workout_result = []
    if (daily_measurement.workout_result && daily_measurement.workout_result.length) {
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
    }
    return { ...JSON.parse(JSON.stringify(daily_measurement)), nutrition_diary, workout_result }
}

export const connectTwoDailyMeasurements = async (object: DailyMeasurementProps, object2: DailyMeasurementProps) => {
    try {
        let response = JSON.parse(JSON.stringify(object))
        if (object2.weight && !response.weight) response.weight = object2.weight
        if (object2.weight_description && !response.weight_description) response.weight_description = object2.weight_description
        if (object2.neck && !response.neck) response.neck = object2.neck
        if (object2.shoulders && !response.shoulders) response.shoulders = object2.shoulders
        if (object2.chest && !response.chest) response.chest = object2.chest
        if (object2.biceps && !response.biceps) response.biceps = object2.biceps
        if (object2.waist && !response.waist) response.waist = object2.waist
        if (object2.hips && !response.hips) response.hips = object2.hips
        if (object2.thigh && !response.thigh) response.thigh = object2.thigh
        if (object2.calf && !response.calf) response.calf = object2.calf
        if (object2.water && !response.water) response.water = object2.water

        if (object2.nutrition_diary && !response.nutrition_diary) response.nutrition_diary = object2.nutrition_diary
        else if (object2.nutrition_diary && response.nutrition_diary) response.nutrition_diary = response.nutrition_diary.concat(object2.nutrition_diary)

        if (object2.workout_result && !response.workout_result) response.workout_result = object2.workout_result

        return response
    } catch (error: any) {
        throw new Error(error)
    }
}