import { Request, Response } from "express"
import { validatePassword } from "../service/user.service"
import errorBook from "../../utils/errorBook"
import { createSession, findSessions, updateSession } from "../service/session.service"
import config from "config"
import { signJWT } from '../../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body)
    
    if (!user) {
        return res.status(errorBook['INVALID LOGIN OR PASSWORD']['CODE']).send(errorBook['INVALID LOGIN OR PASSWORD']['VALUE'])
    }

    const session = await createSession(user._id, req.get('user-agent') || '')

    const token = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get('accesssTokenTtl') }
    )

    const refresh_token = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get('refreshTokenTtl') }
    )

    return res.send({
        token,
        refresh_token
    })
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const user = res.locals.token
    
    const sessions = await findSessions({ user: user._id, valid: true })

    return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.token.session

    await updateSession({ _id: sessionId }, { valid: false })

    return res.send({
        token: null,
        refresh_token: null
    })
}