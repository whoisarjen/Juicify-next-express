import { UserProps } from "../mongoDB/models/user.model";

export const removeUsersSensitiveData = async (array: Array<UserProps>) => {
    return new Promise(resolve => {
        let newUsers = JSON.parse(JSON.stringify(array))
        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].email) delete newUsers[i].email
            if (newUsers[i].users_roles_ID) delete newUsers[i].users_roles_ID
            if (newUsers[i].registered) delete newUsers[i].registered
            if (newUsers[i].banned) delete newUsers[i].banned
        }
        resolve(newUsers)
    })
} 