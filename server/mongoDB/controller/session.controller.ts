import { Request, Response } from "express"
import { validatePassword } from "../service/user.service"
import errorBook from "../../utils/errorBook"
import { createSession, reIssueAccessToken, updateSession } from "../service/session.service"
import { get } from 'lodash'
import { parseBoolean, signJWT } from '../../utils/jwt.utils'
import { getUserProducts } from '../service/product.service'
import { getUserExercises } from '../service/exercise.service'
import { getUserWorkoutPlans } from "../service/workoutPlan.service"
import { getUserDailyMeasurements } from "../service/dailyMeasurement.service"
import { DocumentDefinition } from "mongoose"
import { UserProps } from "../models/user.model"
import { socketHandleUserSynchronization } from "../../utils/socket"

export async function createUserSessionController(req: Request, res: Response) {
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(errorBook['INVALID LOGIN OR PASSWORD']['CODE']).send(errorBook['INVALID LOGIN OR PASSWORD']['VALUE'])
    }

    if (!user.email_confirmation) {
        return res.status(errorBook['ACCOUNT_NOT_ACTIVATED']['CODE']).send(errorBook['ACCOUNT_NOT_ACTIVATED']['VALUE'])
    }

    const session = await createSession(user._id, req.get('user-agent') || '')

    const token = signJWT(
        { ...user, session: session._id },
        { expiresIn: process.env.TOKEN_LIFE_TIME_IN_S + 's' }
    )

    const refresh_token = signJWT(
        { ...user, session: session._id },
        { expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME_IN_S + 's' }
    )

    const product = await getUserProducts(user)
    const exercise = await getUserExercises(user)
    const workout_plan = await getUserWorkoutPlans(user)
    const daily_measurement = await getUserDailyMeasurements(user)

    res.cookie('token', token, {
        maxAge: parseInt(process.env.COOKIE_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: parseBoolean(process.env.COOKIE_SECURE as string)
    })

    res.cookie('refresh_token', refresh_token, {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: parseBoolean(process.env.COOKIE_SECURE as string)
    })

    res.cookie('settings', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    res.cookie('product', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    res.cookie('exercise', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    res.cookie('workout_plan', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    res.cookie('daily_measurement', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    return res.send({
        token,
        refresh_token,
        product,
        exercise,
        workout_plan,
        daily_measurement
    })
}

export async function refreshUserSessionController(req: Request, res: Response) {
    const refresh_token = get(req, 'cookies.refresh_token') || get(req, 'headers.x-refresh', '').replace(/^Bearer\s/, '')
    const token = await reIssueAccessToken(refresh_token, res)

    if (token) {
        res.setHeader('x-access-token', token)

        res.cookie('token', token, {
            maxAge: parseInt(process.env.COOKIE_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: parseBoolean(process.env.COOKIE_SECURE as string)
        })

    }

    return res.send({ token })
}

export async function synchronizationUserSessionController(req: Request, res: Response) {
    const user = res.locals.token;

    if (req.body.where == 'product') {
        const product = await getUserProducts(user)

        res.cookie('product', new Date().getTime(), {
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: false,
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: false
        })

        res.send(product)
    }

    if (req.body.where == 'exercise') {
        const exercise = await getUserExercises(user)

        res.cookie('exercise', new Date().getTime(), {
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: false,
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: false
        })

        res.send(exercise)
    }

    if (req.body.where == 'workout_plan') {
        const workout_plan = await getUserWorkoutPlans(user)

        res.cookie('workout_plan', new Date().getTime(), {
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: false,
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: false
        })

        res.send(workout_plan)
    }

    if (req.body.where == 'daily_measurement') {
        const daily_measurement = await getUserDailyMeasurements(user)

        res.cookie('daily_measurement', new Date().getTime(), {
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
            httpOnly: false,
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: 'strict',
            secure: false
        })

        res.send(daily_measurement)
    }

}

export async function updateToken(req: Request, res: Response, user: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword' | 'birth'>>) {
    const token = signJWT(
        { ...user, session: res.locals.token.session },
        { expiresIn: process.env.TOKEN_LIFE_TIME_IN_S + 's' }
    )

    await socketHandleUserSynchronization({ req, res, data: [], whatToDo: 'change', where: 'settings' }) // We won't send token, client site will asked for refreshing token. It has to be before cookies.

    res.cookie('token', token, {
        maxAge: parseInt(process.env.COOKIE_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: parseBoolean(process.env.COOKIE_SECURE as string)
    })

    res.cookie('settings', new Date().getTime(), {
        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S as string),
        httpOnly: false,
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    return token
}

export async function deleteUserSessionController(req: Request, res: Response) {
    const sessionId = res.locals.token.session

    if (sessionId) {
        await updateSession({ _id: sessionId }, { valid: false })
    }

    res.cookie('token', '', {
        maxAge: 0,
        httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: parseBoolean(process.env.COOKIE_SECURE as string)
    })

    res.cookie('refresh_token', '', {
        maxAge: 0,
        httpOnly: parseBoolean(process.env.COOKIE_HTTPONLY as string),
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: parseBoolean(process.env.COOKIE_SECURE as string)
    })

    return res.send({
        token: null,
        refresh_token: null
    })
}