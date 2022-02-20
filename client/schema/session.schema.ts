import { object, string, TypeOf } from "zod"
import errorBook from "../utils/error.utils"

export const CreateSessionSchema = object({
    login: string({
        required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
    }).min(3),
    password: string({
        required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
    }).min(8)
})

export type CreateSessionSchemaProps = TypeOf<typeof CreateSessionSchema>