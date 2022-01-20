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
exports.getExerciseByNameHandler = exports.getUserExercisesHandler = exports.deleteManyExerciseHandler = exports.createExerciseHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const exercise_service_1 = require("../service/exercise.service");
const socket_1 = require("../../utils/socket");
const createExerciseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield (0, exercise_service_1.createExercise)(req.body.array);
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: exercise, whatToDo: 'change', where: 'exercise' });
        return res.send(exercise);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.createExerciseHandler = createExerciseHandler;
const deleteManyExerciseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.array.forEach((Exercise) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, exercise_service_1.deleteManyExercise)({
                _id: Exercise._id,
                user_ID: Exercise.user_ID
            });
        }));
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: req.body.array, whatToDo: 'delete', where: 'exercise' });
        return res.send({});
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.deleteManyExerciseHandler = deleteManyExerciseHandler;
const getUserExercisesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield (0, exercise_service_1.getUserExercises)(res.locals.token);
        return res.send(exercises);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getUserExercisesHandler = getUserExercisesHandler;
const getExerciseByNameHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, exercise_service_1.getExerciseByName)(req.body.find);
        return res.send({ items });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getExerciseByNameHandler = getExerciseByNameHandler;
