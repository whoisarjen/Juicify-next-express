import { Request, Response } from "express"
import logger from '../../utils/logger'
import { CreateUserInput } from "../schema/user.schema"
import { changeUser, createUser, getUsersByLogin } from "../service/user.service"
import { omit } from 'lodash'
import { removeUsersSensitiveData } from '../../utils/guest.utils'
import errorBook from "../../utils/errorBook"
import config from "config"
import { signJWT } from "../../utils/jwt.utils"

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

export const changeUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await changeUser({ ...req.body, _id: res.locals.token._id })

        const token = signJWT(
            { ...user, session: res.locals.token.session },
            { expiresIn: config.get<number>('TOKEN_LIFE_TIME_IN_S') + 's' }
        )

        res.cookie('token', token, {
            maxAge: config.get<number>('COOKIE_TOKEN_LIFE_TIME_IN_S'),
            httpOnly: config.get<boolean>('COOKIE_HTTPONLY'),
            domain: config.get<string>('COOKIE_DOMAIN'),
            path: '/',
            sameSite: 'strict',
            secure: config.get<boolean>('COOKIE_SECURE')
        })

        return res.send({
            token
        });
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