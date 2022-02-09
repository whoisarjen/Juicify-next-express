import { boolean, number, object, string, TypeOf } from 'zod'

export const productSchema = object({
    name: string().min(3),
    p: number().optional(),
    c: number().optional(),
    s: number().optional(),
    f: number().optional(),
    fi: number().optional(),
    na: number().optional(),
    ethanol: number().optional(),
    code: number().optional(),
    checkMe: boolean().optional(),
})

export type productSchemaProps = TypeOf<typeof productSchema>