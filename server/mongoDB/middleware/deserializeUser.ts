import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

    const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
    const refresh_token = get(req, 'headers.x-refresh', '').replace(/^Bearer\s/, '')

    if (!token) {
        return next();
    }

    const { decoded, expired } = verifyJWT(token)

    if (decoded) {
        res.locals.token = decoded
    }

    if (expired && refresh_token) {
        const newToken = await reIssueAccessToken(refresh_token)
        // console.log('newToken', newToken)

        if (newToken) {
            res.setHeader('x-access-token', newToken)

            const result = verifyJWT(newToken)
    
            res.locals.token = result.decoded;
        }
    }

    return next();
}

export default deserializeUser;