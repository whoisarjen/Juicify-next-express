import { array, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createExerciseSchema = object({
    body: object({
        array: array(
            object({
                name: string({
                    required_error: errorBook['NAME IS REQUIRED']['VALUE']
                }).min(3)
            })
        )
    })
})

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>