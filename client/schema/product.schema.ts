import { boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const ProductSchema = object({
    _id: string(),
    name: string().min(3),
    product_ID: string().optional(),
    meal: preprocess((val) => Number(val), number()).optional(),
    p: preprocess((val) => Number(val), number()).optional(),
    c: preprocess((val) => Number(val), number()).optional(),
    s: preprocess((val) => Number(val), number()).optional(),
    f: preprocess((val) => Number(val), number()).optional(),
    fi: preprocess((val) => Number(val), number()).optional(),
    na: preprocess((val) => Number(val), number()).optional(),
    ethanol: preprocess((val) => Number(val), number()).optional(),
    code: preprocess((val) => Number(val), number()).optional(),
    checkMe: boolean().optional(),
    v: boolean().optional(),
    how_many: preprocess((val) => Number(val), number()).optional(),
})

export type ProductSchemaProps = TypeOf<typeof ProductSchema>