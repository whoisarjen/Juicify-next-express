import { boolean, date, number, object, string, TypeOf } from 'zod'
import config from 'config'

export const createUserSchema = object({
    body: object({
        login: string({
            required_error: config.get(['LOGIN IS REQUIRED']['VALUE'])
        }),
        password: string({
            required_error: config.get(['PASSWORD IS REQUIRED']['VALUE'])
        }),
        passwordConfirmation: string({
            required_error: config.get(['PASSWORD CONFIRMATION IS REQUIRED']['VALUE'])
        }),
        email: string({
            required_error: config.get(['EMAIL IS REQUIRED']['VALUE'])
        })
            .email(config.get(['EMAIL IS NOT VALID']['VALUE'])),
        height: number({
            required_error: config.get(['HEIGHT IS REQUIRED']['VALUE'])
        }),
        birth: date({
            required_error: config.get(['BIRTHDAY IS REQUIRED']['VALUE'])
        }),
        sex: boolean({
            required_error: config.get(['SEX IS REQUIRED']['VALUE'])
        })
    }).refine(data => data.password === data.passwordConfirmation, {
        message: config.get(['PASSWORDS DO NOT MATCH']['VALUE']),
        path: ['passwordConfirmation']
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">