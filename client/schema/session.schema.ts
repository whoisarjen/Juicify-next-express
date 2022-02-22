import { object, string, TypeOf } from "zod"

export const CreateSessionSchema = object({
    login: string().min(3).max(50),
    password: string().min(8).max(150)
})

export type CreateSessionSchemaProps = TypeOf<typeof CreateSessionSchema>