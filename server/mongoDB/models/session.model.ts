import mongoose from "mongoose";
import { UserProps } from './user.model'

export interface SessionProps extends mongoose.Document {
    user_ID: UserProps['_id'],
    valid: boolean,
    createdAt: Date,
    updatedAt: Date,
    userAgent: string
}

const sessionSchema = new mongoose.Schema({
    user_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: String
}, {
    timestamps: true
})

export const SessionModel = mongoose.model('session', sessionSchema);