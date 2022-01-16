import UserProps from "../../interfaces/user"

export default async function (array: Array<UserProps>) {
    return new Promise(resolve => {
        let response: Array<UserProps> = JSON.parse(JSON.stringify(array))
        if (response[0]._id) delete response[0]._id
        if (response[0].login) delete response[0].login
        if (response[0].email) delete response[0].email
        if (response[0].users_roles_ID) delete response[0].users_roles_ID
        if (response[0].registered) delete response[0].registered
        if (response[0].banned) delete response[0].banned
        resolve(response)
    })
}