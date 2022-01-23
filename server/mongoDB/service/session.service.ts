import { FilterQuery, UpdateQuery } from "mongoose";
import { signJWT, verifyJWT } from "../../utils/jwt.utils";
import { SessionModel, SessionProps } from "../models/session.model";
import { get } from 'lodash'
import { getUser } from './user.service'
import { Response } from 'express'
import settings from "../../settings/default";

export async function createSession(user_ID: string, userAgent: string) {
    const session = await SessionModel.create({ user_ID: user_ID, userAgent })

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionProps>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionProps>, update: UpdateQuery<SessionProps>) {
    return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken(refresh_token: string, res: Response) {
    const { decoded }: any = verifyJWT(refresh_token)

    // 30 days before refresh_token expired, gona refresh it
    if (new Date(decoded.exp) < new Date((new Date()).setDate((new Date()).getDate() + 30))) {
        res.cookie('refresh_token', refresh_token, {
            maxAge: settings.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S,
            httpOnly: settings.COOKIE_HTTPONLY,
            domain: settings.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: settings.COOKIE_SECURE
        })
    }

    if (!decoded || !get(decoded, 'session')) {
        return false;
    }

    const session = await SessionModel.findById(get(decoded, 'session'))

    if (!session || !session.valid) {
        return false;
    }

    const user = await getUser({ _id: session.user_ID })

    if (!user) {
        return false;
    }

    const token = signJWT(
        { ...user, session: session._id },
        { expiresIn: settings.TOKEN_LIFE_TIME_IN_S }
    )

    return token;
}