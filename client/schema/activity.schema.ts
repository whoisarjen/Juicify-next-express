import { number, object, preprocess, string, TypeOf } from 'zod'

export const ActivitySchema = object({
    _id: string().optional(),
    user_ID: string().optional(),
    calories: preprocess((val) => Number(val), number()).optional(),
    activity: string().optional(),
    meal: preprocess((val) => Number(val), number()).optional(),
    how_many: preprocess((val) => Number(val), number()).optional(),
})

export type ActivitySchemaProps = TypeOf<typeof ActivitySchema>