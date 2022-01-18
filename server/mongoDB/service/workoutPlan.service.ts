import { DocumentDefinition } from 'mongoose'
import { WorkoutPlanModel, WorkoutPlanProps, WorkoutPlanPropsDry } from '../models/workoutPlan.model'
import { UserProps } from '../models/user.model'
import { getExercise } from './exercise.service'

export const createWorkoutPlan = async (input: DocumentDefinition<Array<WorkoutPlanProps>> | Array<WorkoutPlanPropsDry>) => {
    try {
        const WorkoutPlan = await WorkoutPlanModel.create(input)
        return WorkoutPlan
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteManyWorkoutPlan = async (input: DocumentDefinition<WorkoutPlanProps>) => {
    try {
        const WorkoutPlan = await WorkoutPlanModel.updateOne(
            input,
            [
                {
                    $set: { deleted: true }
                }
            ]
        )
        return WorkoutPlan
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserWorkoutPlans = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const WorkoutPlans = await WorkoutPlanModel.find({
            user_ID: token._id
        })

        if (WorkoutPlans.length) {
            for (let i = 0; i < WorkoutPlans.length; i++) {
                WorkoutPlans[i] = await loadWorkoutPlanMissingData(WorkoutPlans[i])
            }
        }

        return WorkoutPlans
    } catch (error: any) {
        throw new Error(error)
    }
}

export const loadWorkoutPlanMissingData = async (workoutPlan: WorkoutPlanProps) => {
    const exercises = []
    if (workoutPlan && workoutPlan.exercises && workoutPlan.exercises.length) {
        for (let a = 0; a < workoutPlan.exercises.length; a++) {
            exercises.push({ ...await getExercise(workoutPlan.exercises[a]._id) })
        }
    }
    return { ...JSON.parse(JSON.stringify(workoutPlan)), exercises }
}