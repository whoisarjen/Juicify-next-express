import { Express } from 'express'
import { createUserHandler, changeUserHandler, getUsersByLoginHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler, synchronizationUserSessionHandler, refreshUserSessionHandler, deleteUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductHandler, deleteManyProductHandler, getProductByNameHandler } from '../mongoDB/controller/product.controller';
import { createExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseHandler, deleteManyExerciseHandler, getExerciseByNameHandler } from '../mongoDB/controller/exercise.controller';
import { createWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlanHandler, deleteManyWorkoutPlanHandler, getGuestWorkoutPlanHandler, getGuestWorkoutPlansHandler } from '../mongoDB/controller/workoutPlan.controller';
import { createDailyMeasurementSchema } from '../mongoDB/schema/dailyMeasurement.schema'
import { createDailyMeasurementHandler, changeDailyMeasurementHandler, getGuestDailyMeasurementHandler } from '../mongoDB/controller/dailyMeasurement.controller'
import { getGuestDailyMeasurementsHandler } from '../mongoDB/controller/dailyMeasurements.controller'
import getUserByLogin from '../mongoDB/middleware/getUserByLogin';
import { analyzeCoachHandler, createCoachHandler } from '../mongoDB/controller/coach.controller';
import { findSchema } from '../mongoDB/schema/find.schema';

const routes = (app: Express) => {
    app.post('/synchronization', requireUser, synchronizationUserSessionHandler)

    app.post('/find/users', validateResource(findSchema), getUsersByLoginHandler)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionHandler)
    app.post('/auth/refresh', requireUser, refreshUserSessionHandler)
    app.post('/auth/change', requireUser, changeUserHandler)
    app.post('/auth/register', validateResource(createUserSchema as any), createUserHandler)
    app.post('/auth/logout', requireUser, deleteUserSessionHandler)

    app.post('/find/products', validateResource(findSchema), getProductByNameHandler)
    app.post('/insert/product', requireUser, validateResource(createProductSchema), createProductHandler)
    app.post('/delete/product', requireUser, deleteManyProductHandler)

    app.post('/find/exercises', validateResource(findSchema), getExerciseByNameHandler)
    app.post('/insert/exercise', requireUser, validateResource(createExerciseSchema), createExerciseHandler)
    app.post('/delete/exercise', requireUser, deleteManyExerciseHandler)

    app.post('/guest/workout_plan', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlanHandler)
    app.post('/guest/workout_plans', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlansHandler)
    app.post('/insert/workout_plan', requireUser, validateResource(createWorkoutPlanSchema), createWorkoutPlanHandler)
    app.post('/delete/workout_plan', requireUser, deleteManyWorkoutPlanHandler)

    app.post('/guest/daily_measurement', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementHandler)
    app.post('/guest/daily_measurements', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementsHandler)
    app.post('/insert/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), createDailyMeasurementHandler)
    app.post('/update/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), changeDailyMeasurementHandler)

    app.post('/coach/create', requireUser, createCoachHandler)
    app.post('/coach/create', requireUser, analyzeCoachHandler)
}

export default routes;