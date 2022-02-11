import { number, object, preprocess, string, TypeOf } from 'zod'

export const CreateWorkoutPlanSchema = object({
    title: string({}).min(3),
    description: string().optional(),
    burnt: preprocess((val) => Number(val), number().optional()),
})

export type CreateWorkoutPlanSchemaProps = TypeOf<typeof CreateWorkoutPlanSchema>