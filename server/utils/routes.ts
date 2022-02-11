import { Express } from 'express'
import { createUserHandler, changeUserHandler, getUsersByLoginHandler, confirmUserHandler, resetPasswordHandler, resetPasswordConfirmationHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler, synchronizationUserSessionHandler, refreshUserSessionHandler, deleteUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema, confirmEmailSchema, resetPasswordSchema, resetPasswordConfirmationSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductHandler, deleteManyProductHandler, getProductByCodeHandler, getProductByNameHandler } from '../mongoDB/controller/product.controller';
import { CreateExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseHandler, deleteManyExerciseHandler, getExerciseByNameHandler } from '../mongoDB/controller/exercise.controller';
import { CreateWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlansController, deleteWorkoutPlansController, getGuestWorkoutPlansController, getGuestWorkoutPlanController, updateWorkoutPlansController } from '../mongoDB/controller/workoutPlan.controller';
import { createDailyMeasurementSchema } from '../mongoDB/schema/dailyMeasurement.schema'
import { createDailyMeasurementHandler, changeDailyMeasurementHandler, getGuestDailyMeasurementHandler } from '../mongoDB/controller/dailyMeasurement.controller'
import { getGuestDailyMeasurementsHandler } from '../mongoDB/controller/dailyMeasurements.controller'
import getUserByLogin from '../mongoDB/middleware/getUserByLogin';
import { analyzeCoachHandler, createCoachHandler } from '../mongoDB/controller/coach.controller';
import { findSchema } from '../mongoDB/schema/find.schema';
import { getAvatarHandler } from '../mongoDB/controller/images.controller';

const routes = (app: Express) => {
    app.post('/synchronization', requireUser, synchronizationUserSessionHandler)
    app.get('/avatar/:id', getAvatarHandler)

    app.post('/find/users', getUsersByLoginHandler)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionHandler)
    app.post('/auth/refresh', requireUser, refreshUserSessionHandler)
    app.post('/auth/change', requireUser, changeUserHandler)
    app.post('/auth/register', validateResource(createUserSchema as any), createUserHandler)
    app.post('/auth/logout', deleteUserSessionHandler)
    app.post('/auth/confirm-email', validateResource(confirmEmailSchema), confirmUserHandler)
    app.post('/auth/reset-password', validateResource(resetPasswordSchema), resetPasswordHandler)
    app.post('/auth/reset-password-confirmation', validateResource(resetPasswordConfirmationSchema), resetPasswordConfirmationHandler)

    app.post('/find/product', getProductByCodeHandler)
    app.post('/find/products', validateResource(findSchema), getProductByNameHandler)
    app.post('/insert/product', requireUser, validateResource(createProductSchema), createProductHandler)
    app.post('/delete/product', requireUser, deleteManyProductHandler)

    app.post('/find/exercises', validateResource(findSchema), getExerciseByNameHandler)
    app.post('/insert/exercise', requireUser, validateResource(CreateExerciseSchema), createExerciseHandler)
    app.post('/delete/exercise', requireUser, deleteManyExerciseHandler)

    app.post('/guest/workout_plan', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlanController)
    app.post('/guest/workout_plans', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlansController)
    app.post('/insert/workout_plan', requireUser, validateResource(CreateWorkoutPlanSchema), createWorkoutPlansController)
    app.post('/update/workout_plan', requireUser, validateResource(CreateWorkoutPlanSchema), updateWorkoutPlansController)
    app.post('/delete/workout_plan', requireUser, deleteWorkoutPlansController)

    app.post('/guest/daily_measurement', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementHandler)
    app.post('/guest/daily_measurements', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementsHandler)
    app.post('/insert/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), createDailyMeasurementHandler)
    app.post('/update/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), changeDailyMeasurementHandler)

    app.post('/coach/create', requireUser, createCoachHandler)
    app.post('/coach/create', requireUser, analyzeCoachHandler)
}

export default routes;