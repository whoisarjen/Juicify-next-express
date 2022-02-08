import { DocumentDefinition } from 'mongoose'
import { DailyMeasurementModel, DailyMeasurementProps } from '../models/dailyMeasurement.model'
import { UserProps } from '../models/user.model'
import logger from '../../utils/logger'
import { loadDailyMeasurementMissingData } from '../../utils/dailyMeasurement.utils'

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