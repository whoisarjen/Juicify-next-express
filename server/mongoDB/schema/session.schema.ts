import { object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const SessionSchema = object({
    login: string({
        required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
    }),
    password: string({
        required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
    })
})

export type SessionSchemaType = TypeOf<typeof SessionSchema>

export const createSessionSchema = object({
    body: SessionSchema
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>