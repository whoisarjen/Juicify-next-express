import { boolean, date, number, object, string, TypeOf } from 'zod'
import errorBook from '../../utils/errorBook'

export const createUserSchema = object({
    body: object({
        login: string({
            required_error: errorBook['LOGIN IS REQUIRED']['VALUE']
        }),
        password: string({
            required_error: errorBook['PASSWORD IS REQUIRED']['VALUE']
        }),
        passwordConfirmation: string({
            required_error: errorBook['PASSWORD CONFIRMATION IS REQUIRED']['VALUE']
        }),
        email: string({
            required_error: errorBook['EMAIL IS REQUIRED']['VALUE']
        })
        .email(errorBook['EMAIL IS NOT VALID']['VALUE']),
        height: number({
            required_error: errorBook['HEIGHT IS REQUIRED']['VALUE']
        }),
        birth: date({
            required_error: errorBook['BIRTHDAY IS REQUIRED']['VALUE']
        }),
        sex: boolean({
            required_error: errorBook['SEX IS REQUIRED']['VALUE']
        })
    }).refine(data => data.password === data.passwordConfirmation, {
        message: errorBook['PASSWORDS DO NOT MATCH']['VALUE'],
        path: ['passwordConfirmation']
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">