import { object, string, TypeOf } from 'zod'
import errorBook from '../../server/utils/errorBook'

export const createExerciseSchema = object({
    name: string({
        required_error: errorBook['NAME IS REQUIRED']['VALUE']
    }),
    user_ID: string({
        required_error: errorBook['USER IS REQUIRED']['VALUE']
    })
})

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>