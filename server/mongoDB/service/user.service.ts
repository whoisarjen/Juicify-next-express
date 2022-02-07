import { DocumentDefinition, FilterQuery } from 'mongoose'
import { UserModel, UserProps } from '../models/user.model'
import { omit } from 'lodash'
import { sendEmail } from '../../utils/mail.utils'
import mongoose from "mongoose";

export const createUser = async (input: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        const user = await UserModel.create(input)
        await sendEmail({
            clientEmail: user.toJSON().email,
            subject: `Email Confirmation ${process.env.ORIGIN}`,
            html: `Your account is created, but to make it active, you have to confirm your email. Please click the link: <a href="${process.env.ORIGIN}/confirm-password/${user.toJSON().email_confirmation_hash}">confirmation link</a>`
        })
        return omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeUser = async (input: DocumentDefinition<Omit<UserProps, 'createdAt' | 'updatedAt' | 'comparePassword' | 'birth'>>) => {
    try {
        const user = await UserModel.findOneAndUpdate(
            {
                _id: input._id
            },
            {
                $set: { ...omit(input, '_id') }
            },
            {
                new: true
            }
        )

        return omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function validatePassword({ login, password }: { login: string, password: string }) {
    const user = await UserModel.findOne({ login })
    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
        return false
    }

    return omit(user.toJSON(), 'password')
}

export async function getUser(query: FilterQuery<UserProps>) {
    return UserModel.findOne(query).lean()
}

export const getUsersByLogin = async (find: string) => {
    try {
        const users = await UserModel.find({
            login: { '$regex': find, '$options': 'i' }
        })
            .limit(10)
            .sort({ l: 1 })

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function confirmUser(email_confirmation_hash: string) {
    try {
        const user = await UserModel.findOneAndUpdate(
            {
                email_confirmation_hash: email_confirmation_hash
            },
            {
                $set: {
                    email_confirmation: true
                }
            },
            {
                new: true
            }
        )

        return user.toJSON();
    } catch (error: any) {

    }
}

export async function resetPassword(email: string) {
    try {
        const user = await UserModel.findOneAndUpdate(
            {
                email: { $regex: email, $options: 'im' }
            },
            {
                $set: {
                    password_remind_hash: new mongoose.Types.ObjectId()
                }
            },
            {
                new: true
            }
        )
        if(user){
            await sendEmail({
                clientEmail: user.email,
                subject: `Confirmation Password Reset ${process.env.ORIGIN}`,
                html: `Before we reset your password, please confirm the request came from you by clicking this link: <a href="${process.env.ORIGIN}/reset-password/${user.toJSON().password_remind_hash}">confirmation link</a>`
            })
        }
        return user.toJSON();
    } catch (error: any) {

    }
}

export async function resetPasswordConfirmation(reset_password_hash: string) {
    try {
        const password = new mongoose.Types.ObjectId().toJSON()
        const user = await UserModel.findOneAndUpdate(
            {
                reset_password_hash: reset_password_hash
            },
            {
                $set: {
                    password: password
                }
            },
            {
                new: true
            }
        )
        if(user){
            await sendEmail({
                clientEmail: user.email,
                subject: `Confirmation Password Reset ${process.env.ORIGIN}`,
                html: `Your password was changed to: ${password}`
            })
        }
        return user.toJSON();
    } catch (error: any) {

    }
}