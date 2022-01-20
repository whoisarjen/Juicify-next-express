"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWorkoutPlanMissingData = exports.getUserWorkoutPlans = exports.deleteManyWorkoutPlan = exports.createWorkoutPlan = void 0;
const workoutPlan_model_1 = require("../models/workoutPlan.model");
const exercise_service_1 = require("./exercise.service");
const createWorkoutPlan = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WorkoutPlan = yield workoutPlan_model_1.WorkoutPlanModel.create(input);
        return WorkoutPlan;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createWorkoutPlan = createWorkoutPlan;
const deleteManyWorkoutPlan = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WorkoutPlan = yield workoutPlan_model_1.WorkoutPlanModel.updateOne(input, [
            {
                $set: { deleted: true }
            }
        ]);
        return WorkoutPlan;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteManyWorkoutPlan = deleteManyWorkoutPlan;
const getUserWorkoutPlans = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WorkoutPlans = yield workoutPlan_model_1.WorkoutPlanModel.find({
            user_ID: token._id
        });
        if (WorkoutPlans.length) {
            for (let i = 0; i < WorkoutPlans.length; i++) {
                WorkoutPlans[i] = yield (0, exports.loadWorkoutPlanMissingData)(WorkoutPlans[i]);
            }
        }
        return WorkoutPlans;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserWorkoutPlans = getUserWorkoutPlans;
const loadWorkoutPlanMissingData = (workoutPlan) => __awaiter(void 0, void 0, void 0, function* () {
    const exercises = [];
    if (workoutPlan && workoutPlan.exercises && workoutPlan.exercises.length) {
        for (let a = 0; a < workoutPlan.exercises.length; a++) {
            exercises.push(Object.assign({}, yield (0, exercise_service_1.getExercise)(workoutPlan.exercises[a]._id)));
        }
    }
    return Object.assign(Object.assign({}, JSON.parse(JSON.stringify(workoutPlan))), { exercises });
});
exports.loadWorkoutPlanMissingData = loadWorkoutPlanMissingData;
