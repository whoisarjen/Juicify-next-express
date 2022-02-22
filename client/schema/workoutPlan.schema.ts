import { array, number, object, preprocess, string, TypeOf } from 'zod'
import { ExerciseSchema } from './exercise.schema'

export const WorkoutPlanSchema = object({
    _id: string().optional(),
    user_ID: string().optional(),
    title: string().min(3),
    description: string().optional(),
    burnt: preprocess((val) => Number(val), number()).optional(),
    exercises: array(ExerciseSchema).optional()
})

export type WorkoutPlanSchemaProps = TypeOf<typeof WorkoutPlanSchema>