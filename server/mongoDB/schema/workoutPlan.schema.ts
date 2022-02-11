import { array, object, TypeOf } from 'zod'
import { WorkoutPlanSchema } from '../../../client/schema/workoutPlan.schema'

export const CreateWorkoutPlanSchema = object({
    body: object({
        array: array(
            WorkoutPlanSchema
        )
    })
})

export type CreateWorkoutPlanSchemaProps = TypeOf<typeof CreateWorkoutPlanSchema>