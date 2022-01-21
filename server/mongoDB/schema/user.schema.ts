import { object, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'
import { createUserSchema as schema } from '../../../client/schema/user.schema'

export const createUserSchema = object({
    body: schema
}).refine((data: any) => data.password === data.passwordConfirmation, {
    message: errorBook['PASSWORDS DO NOT MATCH']['VALUE'],
    path: ['passwordConfirmation']
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">