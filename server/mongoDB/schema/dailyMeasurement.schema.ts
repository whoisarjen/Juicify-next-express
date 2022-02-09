import { array, date, object, preprocess, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createDailyMeasurementSchema = object({
    body: object({
        array: array(
            object({
                whenAdded: preprocess((val: any) => new Date(val.slice(0, 10)), date({
                    required_error: errorBook['DATE IS REQUIRED']['VALUE']
                }))
            })
        )
    })
})

export type CreateDailyMeasurementInput = TypeOf<typeof createDailyMeasurementSchema>