import { object, string, TypeOf } from 'zod'
import errorBook from '../utils/error.utils'

export const createExerciseSchema = object({
    name: string({
        required_error: errorBook['NAME IS REQUIRED']['VALUE']
    }).min(3)
})

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>