import { array, object, TypeOf } from 'zod'
import { createExerciseSchema as schema } from '../../../client/schema/exercise.schema'

export const createExerciseSchema = object({
    body: object({
        array: array(
            schema
        )
    })
})

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>