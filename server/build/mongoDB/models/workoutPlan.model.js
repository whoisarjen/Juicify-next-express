"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutPlanModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const exerciseSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: [true, 'required!']
    }
}, { _id: false });
const workout_planSchema = new mongoose_1.default.Schema({
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
});
exports.WorkoutPlanModel = mongoose_1.default.model('workout_plan', workout_planSchema);
