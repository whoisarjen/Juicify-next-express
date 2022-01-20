import { Request, Response, NextFunction } from 'express'
import errorBook from '../../utils/errorBook';
import { removeUsersSensitiveData } from '../../utils/guest.utils';
import logger from '../../utils/logger';
import { getUser } from '../service/user.service';

export default async function getUserByLogin(req: Request, res: Response, next: NextFunction) {
    if (!req.body.login) {
        logger.error('getUserByLogin kicked out cheater', req.body)
        return res.status(errorBook['LOGIN IS REQUIRED']['CODE']).send(errorBook['LOGIN IS REQUIRED']['VALUE'])
    }

    const user = await getUser({ login: req.body.login })

    if (!user || (user && user.public_profile === 0)) {
        if (user) {
            return res.send({
                user: (await removeUsersSensitiveData([user]))[0]
            })
        } else {
            logger.error(`Someone try to see not existing user ${req.body.login}.`)
            console.log(errorBook['USER NOT AVAILABLE']['CODE'])
            return res.status(errorBook['USER NOT AVAILABLE']['CODE']).send(errorBook['USER NOT AVAILABLE']['VALUE'])
        }
    }

    res.locals.user = user

    next();
} 