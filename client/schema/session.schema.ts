import { object, string, TypeOf } from "zod"
import errorBook from "../utils/error.utils"

export const createSessionSchema = object({
    login: string({
        required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
    }).min(3),
    password: string({
        required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
    }).min(8)
})

export type CreateSessionProps = TypeOf<typeof createSessionSchema>