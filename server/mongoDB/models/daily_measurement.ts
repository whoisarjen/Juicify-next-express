import NutritionDiaryProps from '../../interfaces/nutritionDiary'
import WorkoutResultProps from '../../interfaces/workoutResult'
import ResultProps from '../../interfaces/result'
import ValueProps from '../../interfaces/value'
import DailyMeasurementProps from '../../interfaces/dailyMeasurement'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const nutrition_diarySchema: NutritionDiaryProps = new Schema({
    meal: Number,
    how_many: Number,
    product_ID: String,
    calories: Number,
    activity: String
})

const valueSchema: ValueProps = new Schema({
    reps: Number,
    weight: Number
}, { _id : false });

const resultSchema: ResultProps = new Schema({
    _id: String,
    values: {
	    type: [valueSchema],
	    default: undefined
	}
}, { _id : false });

const workout_resultSchema: WorkoutResultProps = new Schema({
    workout_plan_ID: String,
    title: String,
    description: String,
    results: {
	    type: [resultSchema],
	    default: undefined
	}
})

const daily_measurementSchema: DailyMeasurementProps = new Schema({
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
	    type: [nutrition_diarySchema],
	    default: undefined
	},
    workout_result: {
	    type: [workout_resultSchema],
	    default: undefined
	}
})

const dailyMeasurementModel = mongoose.model('daily_measurement', daily_measurementSchema)

export default dailyMeasurementModel;