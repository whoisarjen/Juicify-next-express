import { object, string, TypeOf } from "zod"

export const CreateSessionSchema = object({
    login: string().min(3),
    password: string().min(8)
})

export type CreateSessionSchemaProps = TypeOf<typeof CreateSessionSchema>