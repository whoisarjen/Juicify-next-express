import { array, boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const ValueSchema = object({
    open: preprocess((val) => Boolean(val), boolean()).optional(),
    reps: preprocess((val) => Number(val), number()),
    weight: preprocess((val) => Number(val), number()),
})

export type ValueSchemaProps = TypeOf<typeof ValueSchema>

export const ResultSchema = object({
    _id: string().optional(),
    name: string().optional(),
    values: array(ValueSchema),
})

export type ResultSchemaProps = TypeOf<typeof ResultSchema>

export const WorkoutResultSchema = object({
    _id: string().optional(),
    user_ID: string().optional(),
    workout_plan_ID: string().optional(),
    title: string().optional(),
    description: string().optional(),
    burned: preprocess((val) => Number(val), number()).optional(),
    results: array(ResultSchema).optional(),
})

export type WorkoutResultSchemaProps = TypeOf<typeof WorkoutResultSchema>