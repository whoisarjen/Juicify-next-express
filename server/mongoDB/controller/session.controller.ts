import { Request, Response } from "express"
import { validatePassword } from "../service/user.service"
import errorBook from "../../utils/errorBook"
import { createSession, findSessions, updateSession } from "../service/session.service"
import config from "config"
import { signJWT } from '../../utils/jwt.utils'
import { getUserProducts } from '../service/product.service'
import { getUserExercises } from '../service/exercise.service'
import { getUserWorkoutPlans } from "../service/workoutPlan.service"
import { getUserDailyMeasurements } from "../service/dailyMeasurement.service"
import { DocumentDefinition } from "mongoose"
import { UserProps } from "../models/user.model"

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(errorBook['INVALID LOGIN OR PASSWORD']['CODE']).send(errorBook['INVALID LOGIN OR PASSWORD']['VALUE'])
    }

    const session = await createSession(user._id, req.get('user-agent') || '')

    const token = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get<number>('TOKEN_LIFE_TIME_IN_S') + 's' }
    )

    const refresh_token = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get<number>('REFRESH_TOKEN_LIFE_TIME_IN_S') + 's' }
    )

    const product = await getUserProducts(user)
    const exercise = await getUserExercises(user)
    const workout_plan = await getUserWorkoutPlans(user)
    const daily_measurement = await getUserDailyMeasurements(user)

    res.cookie('token', token, {
        maxAge: config.get<number>('COOKIE_TOKEN_LIFE_TIME_IN_S'),
        httpOnly: config.get<boolean>('COOKIE_HTTPONLY'),
        domain: config.get<string>('COOKIE_DOMAIN'),
        path: '/',
        sameSite: 'strict',
        secure: config.get<boolean>('COOKIE_SECURE')
    })

    res.cookie('refresh_token', refresh_token, {
        maxAge: config.get<number>('COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S'),
        httpOnly: config.get<boolean>('COOKIE_HTTPONLY'),
        domain: config.get<string>('COOKIE_DOMAIN'),
        path: '/',
        sameSite: 'strict',
        secure: config.get<boolean>('COOKIE_SECURE')
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

export async function synchronizationUserSessionHandler(req: Request, res: Response) {
    const user = res.locals.token;

    if (req.body.where == 'product') {
        const product = await getUserProducts(user)
        res.send(product)
    }

    if (req.body.where == 'exercise') {
        const exercise = await getUserExercises(user)
        res.send(exercise)
    }

    if (req.body.where == 'workout_plan') {
        const workout_plan = await getUserWorkoutPlans(user)
        res.send(workout_plan)
    }

    if (req.body.where == 'daily_measurement') {
        const daily_measurement = await getUserDailyMeasurements(user)
        res.send(daily_measurement)
    }

}

export async function updateToken(req: Request, res: Response, user: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword' | 'birth'>>) {
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

    return token
}

// export async function getUserSessionHandler(req: Request, res: Response) {
//     const user = res.locals.token

//     const sessions = await findSessions({ user: user._id, valid: true })

//     return res.send(sessions);
// }

// export async function deleteUserSessionHandler(req: Request, res: Response) {
//     const sessionId = res.locals.token.session

//     await updateSession({ _id: sessionId }, { valid: false })

//     return res.send({
//         token: null,
//         refresh_token: null
//     })
// }