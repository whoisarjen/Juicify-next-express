import { array, date, object, preprocess, string, TypeOf } from 'zod'

export const createDailyMeasurementSchema = object({
    body: object({
        array: array(
            object({
                whenAdded: preprocess((val: any) => new Date(val.slice(0, 10)), date()),
                user_ID: string()
            })
        )
    })
})

export type CreateDailyMeasurementInput = TypeOf<typeof createDailyMeasurementSchema>