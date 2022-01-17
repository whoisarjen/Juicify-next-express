import { DocumentDefinition } from 'mongoose'
import { UserModel, UserProps } from '../models/user.model'

const createUser = async (input: DocumentDefinition<UserProps>) => {
    try {
        return await UserModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default createUser;