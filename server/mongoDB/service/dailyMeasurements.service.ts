import { DailyMeasurementModel } from '../models/dailyMeasurement.model'
import config from 'config'
import { loadDailyMeasurementMissingData } from './dailyMeasurement.service'

export const getDailyMeasurements = async (user: any, whenAdded: any = new Date((new Date().setDate((new Date().getDate() - config.get<number>('numberSupportedDays')))))) => {
    try {
        const daily_measurement = await DailyMeasurementModel.find({
            user_ID: user._id,
            whenAdded: {
                $gte: whenAdded
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