import { boolean, number, object, preprocess, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        login: string().min(3),
        password: string().min(8),
        passwordConfirmation: string().min(8),
        email: string()
            .email(),
        height: preprocess((val) => Number(val), number()),
        birth: string(),
        sex: preprocess((val) => Boolean(val), boolean())
    })
}).refine((data: any) => data.password === data.passwordConfirmation, {
    message: process.env.PASSWORDS_DO_NOT_MATCH,
    path: ['passwordConfirmation']
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">

export const confirmEmailSchema = object({
    body: object({
        email_confirmation_hash: string().min(3)
    })
})

export type confirmEmailInput = Omit<TypeOf<typeof confirmEmailSchema>, "body.passwordConfirmation">

export const resetPasswordSchema = object({
    body: object({
        email: string()
            .email(),
    })
})

export type resetPasswordInput = Omit<TypeOf<typeof resetPasswordSchema>, "body.passwordConfirmation">

export const resetPasswordConfirmationSchema = object({
    body: object({
        reset_password_hash: string().min(3)
    })
})

export type resetPasswordConfirmationInput = Omit<TypeOf<typeof resetPasswordConfirmationSchema>, "body.passwordConfirmation">