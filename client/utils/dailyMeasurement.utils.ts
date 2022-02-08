import DailyMeasurementProps from "../interfaces/dailyMeasurement.interface";
import { addDaysToDate } from "./date.utils";

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

export const loadMissingDays = async (oryginalArray: Array<DailyMeasurementProps>, user_ID: string, howManyDays: number, today: Date | string) => {
    let newArray = []
    let checkingDate = JSON.parse(JSON.stringify(new Date(today)))
    let array = [...oryginalArray].sort((a: DailyMeasurementProps, b: DailyMeasurementProps) => a.whenAdded < b.whenAdded ? 1 : -1)
    let object: any = {}
    for (let i = 0; i < array.length; i++) {
        object[array[i].whenAdded as keyof object] = array[i]
    }
    for (let i = 0; i < howManyDays; i++) {
        newArray.push(
            loadMissingData({
                ...{ _id: "XD" + new Date().getTime() + i, user_ID, whenAdded: checkingDate },
                object: object[checkingDate]
            })
        );
        checkingDate = new Date(addDaysToDate(checkingDate, -1)).toJSON()
    }
    return newArray
}