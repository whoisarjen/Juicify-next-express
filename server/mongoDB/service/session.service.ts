import { FilterQuery, UpdateQuery } from "mongoose";
import { parseBoolean, signJWT, verifyJWT } from "../../utils/jwt.utils";
import { SessionModel, SessionProps } from "../models/session.model";
import { get } from 'lodash'
import { getUser } from './user.service'
import { Response } from 'express'

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
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: parseBoolean(process.env.COOKIE_SECURE as string)
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
        { expiresIn: process.env.TOKEN_LIFE_TIME_IN_S }
    )

    return token;
}