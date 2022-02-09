import { boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const productSchema = object({
    name: string().min(3),
    p: preprocess((val: any) => Number(val || 0), number().optional()),
    c: preprocess((val: any) => Number(val || 0), number().optional()),
    s: preprocess((val: any) => Number(val || 0), number().optional()),
    f: preprocess((val: any) => Number(val || 0), number().optional()),
    fi: preprocess((val: any) => Number(val || 0), number().optional()),
    na: preprocess((val: any) => Number(val || 0), number().optional()),
    ethanol: preprocess((val: any) => Number(val || 0), number().optional()),
    code: preprocess((val: any) => Number(val || 0), number().optional()),
    checkMe: boolean().optional(),
})

export type productSchemaProps = TypeOf<typeof productSchema>