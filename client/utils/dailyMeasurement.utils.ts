import DailyMeasurementProps from "../interfaces/dailyMeasurement.interface";
import { addDaysToDate } from "./date.utils";

export const loadMissingData = ({ _id, user_ID, whenAdded, object = {} }: { _id: string, user_ID: string, whenAdded: string, object: any }) => {
    return {
        ...(object._id ? { _id: object._id } : { _id }),
        ...(object.weight ? { weight: object.weight } : { weight: 0 }),
        ...(object.user_ID ? { user_ID: object.user_ID } : { user_ID }),
        ...(object.whenAdded ? { whenAdded: object.whenAdded } : { whenAdded }),
        ...(object.nutrition_diary ? { nutrition_diary: object.nutrition_diary } : { nutrition_diary: [] }),
        ...(object.workout_result ? { workout_result: object.workout_result } : { workout_result: [] }),
    }
}

export const loadMissingDays = async (oryginalArray: Array<DailyMeasurementProps> = [], user_ID: string, howManyDays: number, today: Date | string) => {
    let newArray = []
    let checkingDate = JSON.parse(JSON.stringify(new Date(today)))
    console.log(oryginalArray)
    let array = JSON.parse(JSON.stringify(oryginalArray))
    if (array.length) {
        array = array.sort((a: DailyMeasurementProps, b: DailyMeasurementProps) => {
            if (a.whenAdded < b.whenAdded) {
                return 1
            } else {
                -1
            }
        })
    }
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