import { Request, Response } from "express"
import logger from '../../utils/logger'
import createUser from "../service/user.service"

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body)
    } catch (error) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}