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
exports.getExerciseByName = exports.getExercise = exports.getUserExercises = exports.deleteManyExercise = exports.createExercise = void 0;
const lodash_1 = require("lodash");
const exercise_model_1 = require("../models/exercise.model");
const createExercise = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exercise_model_1.ExerciseModel.create(input);
        return exercise;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createExercise = createExercise;
const deleteManyExercise = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Exercise = yield exercise_model_1.ExerciseModel.updateOne(input, [
            {
                $set: { deleted: true }
            }
        ]);
        return Exercise;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteManyExercise = deleteManyExercise;
const getUserExercises = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield exercise_model_1.ExerciseModel.find({
            $and: [
                {
                    user_ID: token._id
                },
                {
                    deleted: {
                        $exists: false
                    }
                }
            ]
        });
        return exercises;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserExercises = getUserExercises;
const getExercise = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = (0, lodash_1.omit)((yield exercise_model_1.ExerciseModel.findOne({ _id })).toJSON(), 'deleted');
        return exercise;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getExercise = getExercise;
const getExerciseByName = (find) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let regex = { name: { $regex: find, $options: 'im' } };
        if (find.split(" ").length > 1)
            regex = { $text: { $search: find.split(" ").map((str) => "\"" + str + "\"").join(' ') } };
        const products = yield exercise_model_1.ExerciseModel.find({
            $and: [
                { user_ID: { $exists: false } },
                { deleted: { $exists: false } },
                regex
            ]
        })
            .sort({ l: 1, v: -1 })
            .limit(10);
        return products;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getExerciseByName = getExerciseByName;
