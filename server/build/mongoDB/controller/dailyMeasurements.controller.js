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
exports.getGuestDailyMeasurementsHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
const dailyMeasurements_service_1 = require("../service/dailyMeasurements.service");
const getGuestDailyMeasurementsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((new Date(req.body.uniqueKey).toString() === 'Invalid Date')) {
            logger_1.default.error(`getDailyMeasurementHandler blocked ${req.body.uniqueKey}. Invalid Date`);
            return res.status(errorBook_1.default['DATE IS REQUIRED']['CODE']).send(errorBook_1.default['DATE IS REQUIRED']['VALUE']);
        }
        const dailyMeasurements = yield (0, dailyMeasurements_service_1.getDailyMeasurements)(res.locals.user, req.body.uniqueKey);
        return res.send({ data: dailyMeasurements, user: res.locals.user });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getGuestDailyMeasurementsHandler = getGuestDailyMeasurementsHandler;
