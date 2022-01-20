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
exports.getGuestDailyMeasurementHandler = exports.changeDailyMeasurementHandler = exports.createDailyMeasurementHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const dailyMeasurement_service_1 = require("../service/dailyMeasurement.service");
const socket_1 = require("../../utils/socket");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
const createDailyMeasurementHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseArray = [];
        for (let i = 0; i < req.body.array.length; i++) {
            try {
                const res = yield (0, dailyMeasurement_service_1.getDryDailyMeasurement)({
                    whenAdded: req.body.array[i].whenAdded,
                    user_ID: req.body.array[i].user_ID
                });
                if (res && res._id) {
                    responseArray.push(yield (0, dailyMeasurement_service_1.changeDailyMeasurement)([
                        yield (0, dailyMeasurement_service_1.connectTwoDailyMeasurements)(res, req.body.array[i])
                    ]));
                }
                else {
                    responseArray.push(yield (0, dailyMeasurement_service_1.createDailyMeasurement)([
                        req.body.array[i]
                    ]));
                }
            }
            catch (error) {
                logger_1.default.error(error);
                return res.status(409).send(error.message);
            }
        }
        console.log('res', responseArray);
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: responseArray, whatToDo: 'change', where: 'DailyMeasurement' });
        return res.send(responseArray);
        return res.send();
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.createDailyMeasurementHandler = createDailyMeasurementHandler;
const changeDailyMeasurementHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DailyMeasurements = yield (0, dailyMeasurement_service_1.changeDailyMeasurement)(req.body.array);
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: DailyMeasurements, whatToDo: 'change', where: 'DailyMeasurement' });
        return res.send(DailyMeasurements);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.changeDailyMeasurementHandler = changeDailyMeasurementHandler;
const getGuestDailyMeasurementHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((new Date(req.body.uniqueKey).toString() === 'Invalid Date')) {
            logger_1.default.error(`getDailyMeasurementHandler blocked ${req.body.uniqueKey}. Invalid Date`);
            return res.status(errorBook_1.default['DATE IS REQUIRED']['CODE']).send(errorBook_1.default['DATE IS REQUIRED']['VALUE']);
        }
        const dailyMeasurement = yield (0, dailyMeasurement_service_1.getDailyMeasurement)({
            user_ID: res.locals.user._id,
            whenAdded: req.body.uniqueKey
        });
        return res.send({ data: dailyMeasurement, user: res.locals.user });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getGuestDailyMeasurementHandler = getGuestDailyMeasurementHandler;
