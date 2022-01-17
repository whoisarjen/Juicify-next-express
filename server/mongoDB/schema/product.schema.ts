import { object, string, TypeOf } from 'zod'

export const createProductSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        })
    })
})

export type CreateProductInput = TypeOf<typeof createProductSchema>