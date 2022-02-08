import DailyMeasurementProps from "../interfaces/dailyMeasurement.interface";

export const loadMissingData = ({ _id, user_ID, whenAdded, object }: { _id: string, user_ID: string, whenAdded: string, object: DailyMeasurementProps }) => {
    return {
        ...(object && object._id ? { _id: object._id } : { _id }),
        ...(object && object.weight ? { weight: object.weight } : { weight: 0 }),
        ...(object && object.user_ID ? { user_ID: object.user_ID } : { user_ID }),
        ...(object && object.whenAdded ? { whenAdded: object.whenAdded } : { whenAdded }),
        ...(object && object.nutrition_diary ? { nutrition_diary: object.nutrition_diary } : { nutrition_diary: [] }),
        ...(object && object.workout_result ? { workout_result: object.workout_result } : { workout_result: [] }),
    }
}