"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../mongoDB/controller/user.controller");
const session_controller_1 = require("../mongoDB/controller/session.controller");
const validateResource_1 = __importDefault(require("../mongoDB/middleware/validateResource"));
const user_schema_1 = require("../mongoDB/schema/user.schema");
const session_schema_1 = require("../mongoDB/schema/session.schema");
const requireUser_1 = __importDefault(require("../mongoDB/middleware/requireUser"));
const product_schema_1 = require("../mongoDB/schema/product.schema");
const product_controller_1 = require("../mongoDB/controller/product.controller");
const exercise_schema_1 = require("../mongoDB/schema/exercise.schema");
const exercise_controller_1 = require("../mongoDB/controller/exercise.controller");
const workoutPlan_schema_1 = require("../mongoDB/schema/workoutPlan.schema");
const workoutPlan_controller_1 = require("../mongoDB/controller/workoutPlan.controller");
const dailyMeasurement_schema_1 = require("../mongoDB/schema/dailyMeasurement.schema");
const dailyMeasurement_controller_1 = require("../mongoDB/controller/dailyMeasurement.controller");
const dailyMeasurements_controller_1 = require("../mongoDB/controller/dailyMeasurements.controller");
const getUserByLogin_1 = __importDefault(require("../mongoDB/middleware/getUserByLogin"));
const routes = (app) => {
    app.post('/find/users', user_controller_1.getUsersByLoginHandler);
    app.post('/auth/login', (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.post('/auth/register', (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post('/find/products', product_controller_1.getProductByNameHandler);
    app.post('/insert/product', requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema), product_controller_1.createProductHandler);
    app.post('/delete/product', requireUser_1.default, product_controller_1.deleteManyProductHandler);
    app.post('/find/exercises', exercise_controller_1.getExerciseByNameHandler);
    app.post('/insert/exercise', requireUser_1.default, (0, validateResource_1.default)(exercise_schema_1.createExerciseSchema), exercise_controller_1.createExerciseHandler);
    app.post('/delete/exercise', requireUser_1.default, exercise_controller_1.deleteManyExerciseHandler);
    app.post('/insert/workout_plan', requireUser_1.default, (0, validateResource_1.default)(workoutPlan_schema_1.createWorkoutPlanSchema), workoutPlan_controller_1.createWorkoutPlanHandler);
    app.post('/delete/workout_plan', requireUser_1.default, workoutPlan_controller_1.deleteManyWorkoutPlanHandler);
    app.post('/guest/daily_measurement', getUserByLogin_1.default, dailyMeasurement_controller_1.getGuestDailyMeasurementHandler);
    app.post('/guest/daily_measurements', getUserByLogin_1.default, dailyMeasurements_controller_1.getGuestDailyMeasurementsHandler);
    app.post('/insert/daily_measurement', requireUser_1.default, (0, validateResource_1.default)(dailyMeasurement_schema_1.createDailyMeasurementSchema), dailyMeasurement_controller_1.createDailyMeasurementHandler);
    app.post('/update/daily_measurement', requireUser_1.default, (0, validateResource_1.default)(dailyMeasurement_schema_1.createDailyMeasurementSchema), dailyMeasurement_controller_1.changeDailyMeasurementHandler);
    // app.post('/guest/:where', async (req, res) => {
    //     const loadUserByLogin = require('./mongoDB/load/loadUserByLogin')
    //     req.body.user = await loadUserByLogin(req.body.login)
    //     if (!req.body.user) {
    //         return res.status(404).send({ error: 'Not found' })
    //     }
    //     if (parseInt(req.body.user.public_profile) == 0) {
    //         return res.status(403).send({ user: req.body.user })
    //     }
    //     await require(`./mongoDB/find/${req.params.where}`)(req)
    //         .then((data) => {
    //             return res.send({
    //                 user: req.body.user,
    //                 data
    //             })
    //         })
    // });
};
exports.default = routes;
