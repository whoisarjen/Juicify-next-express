import { array, number, object, preprocess, string, TypeOf } from 'zod'
import { ProductSchema } from './product.schema'
import { WorkoutResultSchema } from './workoutResult.schema'
import { ActivitySchema } from './activity.schema'

export const DailyMeasurementSchema = object({
    _id: string(),
    user_ID: string().optional(),
    whenAdded: string(),
    weight: preprocess((val) => Number(val), number()).optional(),
    nutrition_diary: array(ProductSchema.or(ActivitySchema)).optional(),
    workout_result: array(WorkoutResultSchema).optional(),
})

export type DailyMeasurementSchemaProps = TypeOf<typeof DailyMeasurementSchema>