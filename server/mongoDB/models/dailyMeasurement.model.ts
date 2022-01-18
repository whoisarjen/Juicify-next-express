import mongoose from 'mongoose'

export interface NutritionDiaryProps {
    meal?: number,
    how_many?: number,
    product_ID?: string,
    calories?: number,
    activity?: string
}

const NutritionDiary = new mongoose.Schema({
    meal: Number,
    how_many: Number,
    product_ID: String,
    calories: Number,
    activity: String
})

export interface ValueProps {
    reps?: number,
    weight?: number
}

const ValueSchema = new mongoose.Schema({
    reps: Number,
    weight: Number
}, { _id: false });

export interface ResultProps {
    _id?: string,
    values?: [ValueProps]
}

const ResultSchema = new mongoose.Schema({
    _id: String,
    values: {
        type: [ValueSchema],
        default: undefined
    }
}, { _id: false });

export interface WorkoutResultProps {
    workout_plan_ID?: string,
    title?: string,
    description?: string,
    results: [ResultProps]
}

const workoutResultSchema = new mongoose.Schema({
    workout_plan_ID: String,
    title: String,
    description: String,
    results: {
        type: [ResultSchema],
        default: undefined
    }
})

export interface DailyMeasurementProps {
    _id?: string,
    user_ID?: string,
    whenAdded?: Date,
    weight?: number,
    neck?: number,
    shoulders?: number,
    chest?: number,
    biceps?: number,
    waist?: number,
    hips?: number,
    thigh?: number,
    calf?: number,
    water?: number,
    weight_description?: string,
    nutrition_diary?: [NutritionDiaryProps],
    workout_result?: [WorkoutResultProps]
}

const dailyMeasurementSchema = new mongoose.Schema({
    user_ID: {
        type: String,
        required: [true, 'required!']
    },
    whenAdded: {
        type: Date,
        required: [true, 'required!']
    },
    weight: Number,
    neck: Number,
    shoulders: Number,
    chest: Number,
    biceps: Number,
    waist: Number,
    hips: Number,
    thigh: Number,
    calf: Number,
    water: Number,
    weight_description: String,
    nutrition_diary: {
        type: [NutritionDiary],
        default: undefined
    },
    workout_result: {
        type: [workoutResultSchema],
        default: undefined
    }
})

export const DailyMeasurementModel = mongoose.model('daily_measurement', dailyMeasurementSchema)