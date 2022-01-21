import { object, TypeOf } from 'zod'
import { createSessionSchema as schema } from '../../../client/schema/session.schema'

export const createSessionSchema = object({
    body: schema
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>