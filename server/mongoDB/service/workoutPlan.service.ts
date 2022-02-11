import { DocumentDefinition } from 'mongoose'
import { WorkoutPlanModel } from '../models/workoutPlan.model'
import { UserProps } from '../models/user.model'
import { WorkoutPlanSchemaProps } from '../../../client/schema/workoutPlan.schema'

export const createWorkoutPlans = async (array: Array<WorkoutPlanSchemaProps>) => {
    try {
        return await WorkoutPlanModel.create(array)
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateWorkoutPlan = async (object: WorkoutPlanSchemaProps) => {
    try {
        return await WorkoutPlanModel.findOneAndUpdate({ _id: object._id }, object, { returnNewDocument: true })
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteWorkoutPlan = async (object: WorkoutPlanSchemaProps) => {
    try {
        return await WorkoutPlanModel.deleteOne(object)
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getWorkoutPlanByID = async (_id: string) => {
    try {
        return await WorkoutPlanModel.findOne({ _id })
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserWorkoutPlans = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        return await WorkoutPlanModel.find({ user_ID: token._id })
    } catch (error: any) {
        throw new Error(error)
    }
}