import { array, date, object, preprocess, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createDailyMeasurementSchema = object({
    body: object({
        array: array(
            object({
                whenAdded: preprocess((val: any) => new Date(val.slice(0, 10)), date({
                    required_error: errorBook['DATE IS REQUIRED']['VALUE']
                })),
                // whenAdded: string({
                //     required_error: errorBook['DATE IS REQUIRED']['VALUE']
                // }),
                user_ID: string({
                    required_error: errorBook['USER IS REQUIRED']['VALUE']
                })
            })
        )
    })
})

export type CreateDailyMeasurementInput = TypeOf<typeof createDailyMeasurementSchema>