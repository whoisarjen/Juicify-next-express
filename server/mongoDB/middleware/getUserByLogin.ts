import { Request, Response, NextFunction } from 'express'
import { removeUsersSensitiveData } from '../../utils/guest.utils';
import logger from '../../utils/logger';
import { getUser } from '../service/user.service';

export default async function getUserByLogin(req: Request, res: Response, next: NextFunction) {
    if (!req.body.login) {
        logger.error('getUserByLogin kicked out cheater', req.body)
        return res.status(401).send(process.env.LOGIN_IS_REQUIRED)
    }

    const user = await getUser({ login: req.body.login })

    if (!user || (user && user.public_profile === 0)) {
        if (user) {
            return res.send({
                user: (await removeUsersSensitiveData([user]))[0]
            })
        } else {
            logger.error(`Someone try to see not existing user ${req.body.login}.`)
            return res.status(404).send(process.env.USER_NOT_AVAILABLE)
        }
    }

    res.locals.user = user

    next();
} 