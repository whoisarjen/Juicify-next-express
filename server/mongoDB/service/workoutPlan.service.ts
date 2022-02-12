import { DocumentDefinition } from 'mongoose'
import { WorkoutPlanModel } from '../models/workoutPlan.model'
import { UserProps } from '../models/user.model'
import { WorkoutPlanSchemaProps } from '../../../client/schema/workoutPlan.schema'
import { loadMissingData } from '../../utils/workoutPlan.utils'

export const createWorkoutPlans = async (array: Array<WorkoutPlanSchemaProps>) => {
    try {
        const query = await WorkoutPlanModel.create(array)
        return await loadMissingData(query)
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateWorkoutPlan = async (object: WorkoutPlanSchemaProps) => {
    try {
        const query = await WorkoutPlanModel.findOneAndUpdate({ _id: object._id }, object, { returnNewDocument: true, returnOriginal: false })
        return (await loadMissingData([query]))[0]
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
        const query = await WorkoutPlanModel.findOne({ _id })
        return (await loadMissingData([query]))[0]
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserWorkoutPlans = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const query = await WorkoutPlanModel.find({ user_ID: token._id })
        return await loadMissingData(query)
    } catch (error: any) {
        throw new Error(error)
    }
}