import mongoose from 'mongoose'

export interface ExerciseProps {
    _id?: string,
    user_ID?: string,
    name?: string,
    l?: number
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

exerciseSchema.pre("save", async function (next) {
    let exercise: any = this

    if (exercise.isNew) {
        exercise.l = exercise.name.length
    }

    return next();

})

export const ExerciseModel = mongoose.model('exercise', exerciseSchema)