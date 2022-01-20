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
exports.getUserWorkoutPlansHandler = exports.deleteManyWorkoutPlanHandler = exports.createWorkoutPlanHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const workoutPlan_service_1 = require("../service/workoutPlan.service");
const socket_1 = require("../../utils/socket");
const createWorkoutPlanHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WorkoutPlan = yield (0, workoutPlan_service_1.createWorkoutPlan)(req.body.array);
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: WorkoutPlan, whatToDo: 'change', where: 'WorkoutPlan' });
        return res.send(WorkoutPlan);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.createWorkoutPlanHandler = createWorkoutPlanHandler;
const deleteManyWorkoutPlanHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.array.forEach((WorkoutPlan) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, workoutPlan_service_1.deleteManyWorkoutPlan)({
                _id: WorkoutPlan._id,
                user_ID: WorkoutPlan.user_ID
            });
        }));
        yield (0, socket_1.socketHandleUserSynchronization)({ req, res, data: req.body.array, whatToDo: 'delete', where: 'WorkoutPlan' });
        return res.send({});
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.deleteManyWorkoutPlanHandler = deleteManyWorkoutPlanHandler;
const getUserWorkoutPlansHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const WorkoutPlans = yield (0, workoutPlan_service_1.getUserWorkoutPlans)(res.locals.token);
        return res.send(WorkoutPlans);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getUserWorkoutPlansHandler = getUserWorkoutPlansHandler;
