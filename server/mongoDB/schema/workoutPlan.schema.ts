import { array, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createWorkoutPlanSchema = object({
    body: object({
        array: array(
            object({
                title: string({
                    required_error: errorBook['TITLE IS REQUIRED']['VALUE']
                }),
                user_ID: string({
                    required_error: errorBook['USER IS REQUIRED']['VALUE']
                }),
                exercises: array(
                    object({
                        _id: string({
                            required_error: errorBook['EXERCISE IS REQUIRED']['VALUE']
                        })
                    })
                )
            })
        )
    })
})

export type CreateWorkoutPlanInput = TypeOf<typeof createWorkoutPlanSchema>