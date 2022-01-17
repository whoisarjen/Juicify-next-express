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

export async function findUser(query: FilterQuery<UserProps>) {
    return UserModel.findOne(query).lean()
}

