import { DocumentDefinition, FilterQuery } from 'mongoose'
import { UserModel, UserProps } from '../models/user.model'
import { omit } from 'lodash'

export const createUser = async (input: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeUser = async (input: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword' | 'birth'>>) => {
    try {
        const user = await UserModel.findOneAndUpdate(
            {
                _id: input._id
            },
            {
                $set: { ...omit(input, '_id') }
            },
            {
                new: true
            }
        )
        
        return omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function validatePassword({ login, password }: { login: string, password: string }) {
    const user = await UserModel.findOne({ login })
    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
        return false
    }

    return omit(user.toJSON(), 'password')
}

export async function getUser(query: FilterQuery<UserProps>) {
    return UserModel.findOne(query).lean()
}

export const getUsersByLogin = async (find: string) => {
    try {
        const users = await UserModel.find({
            login: { '$regex': find, '$options': 'i' }
        })
            .limit(10)
            .sort({ l: 1 })

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}