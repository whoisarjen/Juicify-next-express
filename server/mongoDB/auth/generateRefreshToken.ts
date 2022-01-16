import jwt from 'jsonwebtoken'
import UserProps from '../../interfaces/user'
import tokenKEY from './tokenKEY'

export default (array: Array<UserProps>) => {
    return jwt.sign({
        _id: array[0]._id,
        users_roles_ID: array[0].users_roles_ID
    },
        tokenKEY, {
        expiresIn: '28d'
    })
}