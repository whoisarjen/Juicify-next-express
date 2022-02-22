import { Request, Response } from "express"
import logger from '../../utils/logger'
import { CreateUserInput } from "../schema/user.schema"
import { changeUser, createUser, getUsersByLogin, confirmUser, resetPassword, resetPasswordConfirmation } from "../service/user.service"
import { omit } from 'lodash'
import { removeUsersSensitiveData } from '../../utils/guest.utils'
import { updateToken } from "./session.controller"

export const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        if ((new Date(req.body.birth)).toString() === 'Invalid Date') {
            throw process.env.BIRTHDAY_IS_REQUIRED
        }
        const user = await createUser({ ...req.body, birth: new Date(req.body.birth) })
        return res.send(omit(user, 'password'));
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const changeUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await changeUser({ ...req.body, _id: res.locals.token._id })

        const token = await updateToken(req, res, user)

        return res.send({
            token
        });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUsersByLoginController = async (req: Request, res: Response) => {
    try {
        const users = await getUsersByLogin(req.body.find)
        const items = await removeUsersSensitiveData(users)
        return res.send({ items });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const confirmUserController = async (req: Request, res: Response) => {
    try {
        const user = await confirmUser(req.body.email_confirmation_hash)
        return res.send(user);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const user = await resetPassword(req.body.email)
        return res.send(user);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const resetPasswordConfirmationController = async (req: Request, res: Response) => {
    try {
        const user = await resetPasswordConfirmation(req.body.reset_password_hash)
        return res.send(user);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}