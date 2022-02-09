import { array, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'
import { exerciseSchema } from './exercise.schema'

export const createWorkoutPlanSchema = object({
    body: object({
        array: array(
            object({
                title: string({
                    required_error: errorBook['TITLE IS REQUIRED']['VALUE']
                }),
                exercises: array(
                    exerciseSchema
                )
            })
        )
    })
})

export type CreateWorkoutPlanInput = TypeOf<typeof createWorkoutPlanSchema>