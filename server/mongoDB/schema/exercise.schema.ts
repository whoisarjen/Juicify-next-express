import { array, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const exerciseSchema = object({
    name: string({
        required_error: errorBook['NAME IS REQUIRED']['VALUE']
    }).min(3)
})

export const createExerciseSchema = object({
    body: object({
        array: array(
            exerciseSchema
        )
    })
})

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>