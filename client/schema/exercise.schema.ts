import { object, string, TypeOf } from 'zod'
import errorBook from '../utils/error.utils'

export const CreateExerciseSchema = object({
    name: string({
        required_error: errorBook['NAME IS REQUIRED']['VALUE']
    }).min(3)
})

export type CreateExerciseSchemaProps = TypeOf<typeof CreateExerciseSchema>