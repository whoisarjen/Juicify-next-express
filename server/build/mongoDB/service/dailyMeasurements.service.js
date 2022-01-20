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
exports.getDailyMeasurements = void 0;
const dailyMeasurement_model_1 = require("../models/dailyMeasurement.model");
const config_1 = __importDefault(require("config"));
const dailyMeasurement_service_1 = require("./dailyMeasurement.service");
const getDailyMeasurements = (user, whenAdded = new Date((new Date().setDate((new Date().getDate() - config_1.default.get('numberSupportedDays')))))) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daily_measurement = yield dailyMeasurement_model_1.DailyMeasurementModel.find({
            user_ID: user._id,
            whenAdded: {
                $gte: whenAdded
            }
        });
        if (daily_measurement.length) {
            for (let i = 0; i < daily_measurement.length; i++) {
                daily_measurement[i] = yield (0, dailyMeasurement_service_1.loadDailyMeasurementMissingData)(daily_measurement[i]);
            }
        }
        return daily_measurement;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getDailyMeasurements = getDailyMeasurements;
