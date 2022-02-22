import { object, string, TypeOf } from 'zod'

export const createSessionSchema = object({
    body: object({
        login: string().min(3),
        password: string({
            required_error: process.env.PASSWORD_IS_REQUIRED
        }).min(8)
    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>