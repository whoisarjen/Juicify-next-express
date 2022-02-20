import { WorkoutResultSchemaProps } from "../schema/workoutResult.schema"

interface loadMissingDataForWorkoutResultProps {
    whenAdded: string
    workout_description?: string,
    object: WorkoutResultSchemaProps
}

export const loadMissingDataForWorkoutResult = ({ whenAdded, object, workout_description = '' }: loadMissingDataForWorkoutResultProps) => {
    return {
        ...(object?._id && ({ _id: object._id } || { _id: 'XD' + new Date().getTime() })),
        ...(object?.user_ID && ({ user_ID: object.user_ID } || { user_ID: '' })),
        ...(object?.workout_plan_ID && ({ workout_plan_ID: object.workout_plan_ID } || { workout_plan_ID: '' })),
        ...(object?.title && ({ title: object.title } || { title: '' })),
        // ...(object?.whenAdded && ({ whenAdded: object.whenAdded } || { whenAdded })),
        ...(object?.description && ({ description: object.description } || { description: '' })),
        ...(object?.burnt && ({ burnt: object.burnt } || { burnt: 0 })),
        ...(object?.workout_description && ({ workout_description: object.workout_description } || { workout_description })),
        ...(object?.results && ({ results: object.results } || { results: [] })),
    }
}

export const prepareWorkoutResultToSend = (object: WorkoutResultSchemaProps) => {
    return {
        ...(object?._id?.trim() && { _id: object?._id?.trim() }),
        ...(object?.user_ID?.trim() && { user_ID: object?.user_ID?.trim() }),
        ...(object?.workout_plan_ID?.trim() && { workout_plan_ID: object?.workout_plan_ID?.trim() }),
        ...(object?.title?.trim() && { title: object?.title?.trim() }),
        // // // ...(object?.whenAdded?.trim() && { whenAdded: object?.whenAdded?.trim() }),
        ...(object?.description?.trim() && { description: object?.description?.trim() }),
        ...(object?.results && { results: object?.results }),
    }
}