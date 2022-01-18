import { omit } from 'lodash'
import { DocumentDefinition } from 'mongoose'
import { ResultProps } from '../models/dailyMeasurement.model'
import { ExerciseModel, ExerciseProps } from '../models/exercise.model'
import { UserProps } from '../models/user.model'

export const createExercise = async (input: DocumentDefinition<Array<ExerciseProps>>) => {
    try {
        const exercise = await ExerciseModel.create(input)
        return exercise
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteManyExercise = async (input: DocumentDefinition<ExerciseProps>) => {
    try {
        const Exercise = await ExerciseModel.updateOne(
            input,
            [
                {
                    $set: { deleted: true }
                }
            ]
        )
        return Exercise
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserExercises = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const exercises = await ExerciseModel.find({
            $and: [
                {
                    user_ID: token._id
                },
                {
                    deleted:
                    {
                        $exists: false
                    }
                }
            ]
        })
        return exercises
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getExercise = async (_id: string | undefined): Promise<ExerciseProps> => {
    try {
        const exercise = omit((await ExerciseModel.findOne({ _id })).toJSON(), 'deleted')
        return exercise
    } catch (error: any) {
        throw new Error(error)
    }
}