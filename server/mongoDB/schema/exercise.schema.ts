import { array, number, object, string, TypeOf } from 'zod'

export const ExerciseSchema = object({
    _id: string().optional(),
    user_ID: string().optional(),
    name: string().min(3),
    l: number().optional(),
})

export const CreateExerciseSchema = object({
    body: object({
        array: array(
            ExerciseSchema
        )
    })
})

export type CreateExerciseSchemaProps = TypeOf<typeof CreateExerciseSchema>
