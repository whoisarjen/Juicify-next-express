import { array, object, TypeOf } from 'zod'
import { ExerciseSchema } from '../../../client/schema/exercise.schema'

export const CreateExerciseSchema = object({
    body: object({
        array: array(
            ExerciseSchema
        )
    })
})

export type CreateExerciseSchemaProps = TypeOf<typeof CreateExerciseSchema>
