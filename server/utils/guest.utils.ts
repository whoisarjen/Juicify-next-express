import { omit } from "lodash";
import { UserProps } from "../mongoDB/models/user.model";

export const removeUsersSensitiveData = async (array: Array<UserProps>): Promise<Array<any>> => {
    return new Promise(resolve => {
        let newUsers = []
        for (let i = 0; i < array.length; i++) {
            const user = omit(array[i], [
                'email',
                'email_confirmation',
                'registered',
                'password',
                'password_remind_hash',
                'createdAt',
                'updatedAt'
            ])
            newUsers.push(user)
        }
        resolve(newUsers)
    })
}