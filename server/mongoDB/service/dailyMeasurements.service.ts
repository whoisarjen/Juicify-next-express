import { DailyMeasurementModel } from '../models/dailyMeasurement.model'
import settings from "../../settings/default";
import { loadDailyMeasurementMissingData } from './dailyMeasurement.service'

export const getDailyMeasurements = async (user: any, whenAdded: any = new Date((new Date().setDate((new Date().getDate() - settings.numberSupportedDays))))) => {
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