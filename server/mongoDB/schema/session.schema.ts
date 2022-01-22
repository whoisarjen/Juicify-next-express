import { object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createSessionSchema = object({
    body: object({
        login: string({
            required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
        }).min(3),
        password: string({
            required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
        }).min(8)
    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>