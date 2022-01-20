import { Request, Response } from "express"
import logger from '../../utils/logger'
import { CreateUserInput } from "../schema/user.schema"
import { createUser, getUsersByLogin } from "../service/user.service"
import { omit } from 'lodash'
import { removeUsersSensitiveData } from '../../utils/guest.utils'
import errorBook from "../../utils/errorBook"

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        if ((new Date(req.body.birth)).toString() === 'Invalid Date') {
            throw errorBook['BIRTHDAY IS REQUIRED']['VALUE']
        }
        const user = await createUser({ ...req.body, birth: new Date(req.body.birth) })
        return res.send(omit(user, 'password'));
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUsersByLoginHandler = async (req: Request, res: Response) => {
    try {
        const users = await getUsersByLogin(req.body.find)
        const items = await removeUsersSensitiveData(users)
        return res.send({ items });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}