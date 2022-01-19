import { Request, Response } from "express"
import logger from '../../utils/logger'
import { CreateUserInput } from "../schema/user.schema"
import { createUser, getUsersByLogin } from "../service/user.service"
import { omit } from 'lodash'
import { removeUsersSensitiveData } from '../../utils/guest.utils'

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)
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