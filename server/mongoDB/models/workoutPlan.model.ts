import mongoose from "mongoose";
import { ExerciseProps } from "./exercise.model";

export interface WorkoutPlanProps extends mongoose.Document {
    title: string,
    description: string,
    user_ID: string,
    burnt: number,
    exercises: Array<ExerciseProps>
}

const exerciseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'required!']
    }
}, { _id: false })

const workout_planSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'required!']
    },
    description: String,
    user_ID: {
        type: String,
        required: [true, 'required!']
    },
    burnt: Number,
    exercises: [exerciseSchema]
})

export const WorkoutPlanModel = mongoose.model('workout_plan', workout_planSchema)