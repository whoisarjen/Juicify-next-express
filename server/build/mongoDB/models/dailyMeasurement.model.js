"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyMeasurementModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NutritionDiary = new mongoose_1.default.Schema({
    meal: Number,
    how_many: Number,
    product_ID: String,
    calories: Number,
    activity: String
});
const ValueSchema = new mongoose_1.default.Schema({
    reps: Number,
    weight: Number
}, { _id: false });
const ResultSchema = new mongoose_1.default.Schema({
    _id: String,
    values: {
        type: [ValueSchema],
        default: undefined
    }
}, { _id: false });
const workoutResultSchema = new mongoose_1.default.Schema({
    workout_plan_ID: String,
    title: String,
    description: String,
    results: {
        type: [ResultSchema],
        default: undefined
    }
});
const dailyMeasurementSchema = new mongoose_1.default.Schema({
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
});
exports.DailyMeasurementModel = mongoose_1.default.model('daily_measurement', dailyMeasurementSchema);
