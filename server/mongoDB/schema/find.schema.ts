import { object, string, TypeOf } from 'zod'

export const findSchema = object({
    body: object({
        find: string({

        }).min(3)
    })
})

export type findInput = TypeOf<typeof findSchema>