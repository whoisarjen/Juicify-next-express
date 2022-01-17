import mongoose from 'mongoose'

export interface ExerciseProps extends mongoose.Document {
    _id: string,
    user_ID?: string,
    name?: string
}

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        required: [true, 'required!']
    },
    user_ID: String,
    l: Number
})

export const ExerciseModel = mongoose.model('exercise', exerciseSchema)