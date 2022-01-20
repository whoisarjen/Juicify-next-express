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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectTwoDailyMeasurements = exports.loadDailyMeasurementMissingData = exports.getUserDailyMeasurements = exports.getDailyMeasurement = exports.getDryDailyMeasurement = exports.changeDailyMeasurement = exports.createDailyMeasurement = void 0;
const dailyMeasurement_model_1 = require("../models/dailyMeasurement.model");
const config_1 = __importDefault(require("config"));
const product_service_1 = require("./product.service");
const exercise_service_1 = require("./exercise.service");
const createDailyMeasurement = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DailyMeasurement = yield dailyMeasurement_model_1.DailyMeasurementModel.create(input);
        return DailyMeasurement;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createDailyMeasurement = createDailyMeasurement;
const changeDailyMeasurement = (array) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            const newDaily = yield dailyMeasurement_model_1.DailyMeasurementModel.findOneAndReplace({
                "_id": array[i]._id,
                "user_ID": array[i].user_ID
            }, array[i], { returnOriginal: false });
            newArray.push(yield (0, exports.loadDailyMeasurementMissingData)(newDaily));
        }
        return newArray;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.changeDailyMeasurement = changeDailyMeasurement;
const getDryDailyMeasurement = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DailyMeasurement = yield dailyMeasurement_model_1.DailyMeasurementModel.findOne(input);
        return DailyMeasurement;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getDryDailyMeasurement = getDryDailyMeasurement;
const getDailyMeasurement = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DailyMeasurement = yield (0, exports.getDryDailyMeasurement)(input);
        const DailyMeasurementCorrect = yield (0, exports.loadDailyMeasurementMissingData)(DailyMeasurement);
        return DailyMeasurementCorrect;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getDailyMeasurement = getDailyMeasurement;
const getUserDailyMeasurements = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daily_measurement = yield dailyMeasurement_model_1.DailyMeasurementModel.find({
            user_ID: token._id,
            whenAdded: {
                $gte: new Date((new Date().setDate((new Date().getDate() - config_1.default.get('numberSupportedDays')))))
            }
        });
        if (daily_measurement.length) {
            for (let i = 0; i < daily_measurement.length; i++) {
                daily_measurement[i] = yield (0, exports.loadDailyMeasurementMissingData)(daily_measurement[i]);
            }
        }
        return daily_measurement;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserDailyMeasurements = getUserDailyMeasurements;
const loadDailyMeasurementMissingData = (daily_measurement) => __awaiter(void 0, void 0, void 0, function* () {
    const nutrition_diary = [];
    if (daily_measurement && daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length) {
        for (let a = 0; a < daily_measurement.nutrition_diary.length; a++) {
            if (!daily_measurement.nutrition_diary[a].calories && daily_measurement.nutrition_diary[a].product_ID) {
                const { meal, how_many, product_ID } = daily_measurement.nutrition_diary[a];
                nutrition_diary.push(Object.assign(Object.assign({}, yield (0, product_service_1.getProduct)(daily_measurement.nutrition_diary[a].product_ID)), { meal, how_many, product_ID }));
            }
            else {
                nutrition_diary.push(daily_measurement.nutrition_diary[a]);
            }
        }
    }
    const workout_result = [];
    if (daily_measurement.workout_result && daily_measurement.workout_result.length) {
        for (let a = 0; a < daily_measurement.workout_result.length; a++) {
            if (daily_measurement.workout_result[a] && daily_measurement.workout_result[a].results && daily_measurement.workout_result[a].results.length) {
                const results = [];
                for (let b = 0; b < daily_measurement.workout_result[a].results.length; b++) {
                    const { values, _id } = daily_measurement.workout_result[a].results[b];
                    results.push(Object.assign(Object.assign(Object.assign({}, yield (0, exercise_service_1.getExercise)(daily_measurement.workout_result[a].results[b]._id)), (values && { values })), { _id }));
                }
                workout_result.push(Object.assign(Object.assign({}, JSON.parse(JSON.stringify(daily_measurement.workout_result[a]))), { results }));
            }
        }
    }
    return Object.assign(Object.assign({}, JSON.parse(JSON.stringify(daily_measurement))), { nutrition_diary, workout_result });
});
exports.loadDailyMeasurementMissingData = loadDailyMeasurementMissingData;
const connectTwoDailyMeasurements = (object, object2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = JSON.parse(JSON.stringify(object));
        if (object2.weight && !response.weight)
            response.weight = object2.weight;
        if (object2.weight_description && !response.weight_description)
            response.weight_description = object2.weight_description;
        if (object2.neck && !response.neck)
            response.neck = object2.neck;
        if (object2.shoulders && !response.shoulders)
            response.shoulders = object2.shoulders;
        if (object2.chest && !response.chest)
            response.chest = object2.chest;
        if (object2.biceps && !response.biceps)
            response.biceps = object2.biceps;
        if (object2.waist && !response.waist)
            response.waist = object2.waist;
        if (object2.hips && !response.hips)
            response.hips = object2.hips;
        if (object2.thigh && !response.thigh)
            response.thigh = object2.thigh;
        if (object2.calf && !response.calf)
            response.calf = object2.calf;
        if (object2.water && !response.water)
            response.water = object2.water;
        if (object2.nutrition_diary && !response.nutrition_diary)
            response.nutrition_diary = object2.nutrition_diary;
        else if (object2.nutrition_diary && response.nutrition_diary)
            response.nutrition_diary = response.nutrition_diary.concat(object2.nutrition_diary);
        if (object2.workout_result && !response.workout_result)
            response.workout_result = object2.workout_result;
        return response;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.connectTwoDailyMeasurements = connectTwoDailyMeasurements;
