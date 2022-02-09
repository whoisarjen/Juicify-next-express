import { array, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createProductSchema = object({
    body: object({
        array: array(
            object({
                name: string({
                    required_error: errorBook['NAME IS REQUIRED']['VALUE']
                })
            })
        )
    })
})

export type CreateProductInput = TypeOf<typeof createProductSchema>