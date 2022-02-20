import { boolean, number, object, string, TypeOf } from 'zod'

export const ExerciseSchema = object({
    _id: string().optional(),
    user_ID: string().optional(),
    name: string().min(3),
    l: number().optional(),
})

export type ExerciseSchemaProps = TypeOf<typeof ExerciseSchema>