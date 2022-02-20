import { array, number, object, preprocess, string, TypeOf } from 'zod'
import { ProductSchema } from './product.schema'
import { WorkoutResultSchema } from './workoutResult.schema'
import { ActivitySchema } from './activity.schema'

export const DailyMeasurementSchema = object({
    _id: string(),
    user_ID: string(),
    whenAdded: string(),
    weight: preprocess((val) => Number(val), number()),
    nutrition_diary: array(ProductSchema.or(ActivitySchema)),
    workout_result: array(WorkoutResultSchema),
})

export type DailyMeasurementSchemaProps = TypeOf<typeof DailyMeasurementSchema>