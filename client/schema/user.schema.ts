import { boolean, date, number, object, preprocess, string, TypeOf } from 'zod'
import errorBook from '../utils/error.utils'

export const SettingsSchema = object({
    meal_number: preprocess((val) => Number(val), number().min(1).max(10)).optional(),
    fiber: preprocess((val) => Number(val), number().min(0).max(100)).optional(),
    sugar_percent: preprocess((val) => Number(val), number().min(0).max(100)).optional(),
    name: string().max(50).optional(),
    surname: string().max(50).optional(),
    birth: string(),
    height: preprocess((val) => Number(val), number().min(120).max(250)).optional(),
    description: string().max(255).optional(),
    website: string().max(150).optional(),
    facebook: string().max(150).optional(),
    instagram: string().max(150).optional(),
    twitter: string().max(150).optional(),
})

export type SettingsSchemaProps = TypeOf<typeof SettingsSchema>

export const CreateUserSchema = object({
    login: string().min(3).max(50),
    password: string().min(8).max(150),
    passwordConfirmation: string().min(8).max(150),
    email: string().email().max(150),
    height: preprocess((val) => Number(val), number().min(120).max(250)),
    birth: string().or(date()),
    sex: preprocess((val) => Boolean(val), boolean()),
}).refine(data => data.password === data.passwordConfirmation, {
    message: errorBook['PASSWORDS DO NOT MATCH']['VALUE'],
    path: ['passwordConfirmation']
})

export type CreateUserSchemaProps = Omit<TypeOf<typeof CreateUserSchema>, "body.passwordConfirmation">

export const RemindPasswordUserSchema = object({
    email: string()
})

export type RemindPasswordUserSchemaProps = Omit<TypeOf<typeof RemindPasswordUserSchema>, "body.passwordConfirmation">

export type tokenValueProps = CreateUserSchemaProps & SettingsSchemaProps