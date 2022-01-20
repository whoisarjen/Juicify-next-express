import { Express } from 'express'
import { createUserHandler, getUsersByLoginHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductHandler, deleteManyProductHandler, getProductByNameHandler } from '../mongoDB/controller/product.controller';
import { createExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseHandler, deleteManyExerciseHandler, getExerciseByNameHandler } from '../mongoDB/controller/exercise.controller';
import { createWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlanHandler, deleteManyWorkoutPlanHandler } from '../mongoDB/controller/workoutPlan.controller';
import { createDailyMeasurementSchema } from '../mongoDB/schema/dailyMeasurement.schema'
import { createDailyMeasurementHandler, changeDailyMeasurementHandler, getGuestDailyMeasurementHandler } from '../mongoDB/controller/dailyMeasurement.controller'
import { getGuestDailyMeasurementsHandler } from '../mongoDB/controller/dailyMeasurements.controller'
import getUserByLogin from '../mongoDB/middleware/getUserByLogin';

const routes = (app: Express) => {
    app.post('/find/users', getUsersByLoginHandler)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionHandler)
    app.post('/auth/register', validateResource(createUserSchema), createUserHandler)

    app.post('/find/products', getProductByNameHandler)
    app.post('/insert/product', requireUser, validateResource(createProductSchema), createProductHandler)
    app.post('/delete/product', requireUser, deleteManyProductHandler)

    app.post('/find/exercises', getExerciseByNameHandler)
    app.post('/insert/exercise', requireUser, validateResource(createExerciseSchema), createExerciseHandler)
    app.post('/delete/exercise', requireUser, deleteManyExerciseHandler)

    app.post('/insert/workout_plan', requireUser, validateResource(createWorkoutPlanSchema), createWorkoutPlanHandler)
    app.post('/delete/workout_plan', requireUser, deleteManyWorkoutPlanHandler)

    app.post('/guest/daily_measurement', getUserByLogin, getGuestDailyMeasurementHandler)
    app.post('/guest/daily_measurements', getUserByLogin, getGuestDailyMeasurementsHandler)
    app.post('/insert/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), createDailyMeasurementHandler)
    app.post('/update/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), changeDailyMeasurementHandler)

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
}

export default routes;