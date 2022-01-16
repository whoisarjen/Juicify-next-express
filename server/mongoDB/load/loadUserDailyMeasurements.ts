import bible from "../../bible";
import DailyMeasurementProps from "../../interfaces/dailyMeasurement";
import UserProps from "../../interfaces/user";
import dailyMeasurementModel from "../models/daily_measurement";
import loadExercise from "./loadExercise";
import loadProduct from "./loadProduct";

export default async (user: UserProps): Promise<Array<DailyMeasurementProps>> => {
    return new Promise((resolve, reject) => {
        dailyMeasurementModel.find({
            user_ID: user._id,
            whenAdded: {
                $gte: new Date((new Date().setDate((new Date().getDate() - 29)))) // One more than what we support on client's site
            }
        })
            .sort({ "whenAdded": -1 })
            .then(async (oryginal: Array<DailyMeasurementProps>) => {
                const daily_measurement = JSON.parse(JSON.stringify(oryginal))
                if (daily_measurement.length) {
                    for (let i = 0; i < daily_measurement.length; i++) {
                        if (daily_measurement[i].nutrition_diary && daily_measurement[i].nutrition_diary.length) {
                            for (let a = 0; a < daily_measurement[i].nutrition_diary.length; a++) {
                                if (!daily_measurement[i].nutrition_diary[a].calories) {
                                    daily_measurement[i].nutrition_diary[a] = await loadProduct(oryginal[i].nutrition_diary[a])
                                }
                            }
                        }
                        if (daily_measurement[i].workout_result && daily_measurement[i].workout_result.length) {
                            for (let a = 0; a < daily_measurement[i].workout_result.length; a++) {
                                for (let b = 0; b < daily_measurement[i].workout_result[a].results.length; b++) {
                                    daily_measurement[i].workout_result[a].results[b] = await loadExercise(oryginal[i].workout_result[a].results[b])
                                }
                            }
                        }
                    }
                }
                resolve(daily_measurement)
            })
            .catch(() => reject(bible['ERROR']['500']))
    });
}