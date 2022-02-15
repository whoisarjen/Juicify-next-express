import { Express } from 'express'
import { createUserController, changeUserController, getUsersByLoginController, confirmUserController, resetPasswordController, resetPasswordConfirmationController } from '../mongoDB/controller/user.controller';
import { createUserSessionController, synchronizationUserSessionController, refreshUserSessionController, deleteUserSessionController } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema, confirmEmailSchema, resetPasswordSchema, resetPasswordConfirmationSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductController, deleteManyProductController, getProductByCodeController, getProductByNameController } from '../mongoDB/controller/product.controller';
import { CreateExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseController, deleteManyExerciseController, getExerciseByNameController } from '../mongoDB/controller/exercise.controller';
import { CreateWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlansController, deleteWorkoutPlansController, getGuestWorkoutPlansController, getGuestWorkoutPlanController, updateWorkoutPlansController } from '../mongoDB/controller/workoutPlan.controller';
import { createDailyMeasurementSchema } from '../mongoDB/schema/dailyMeasurement.schema'
import { createDailyMeasurementController, changeDailyMeasurementController, getGuestDailyMeasurementController } from '../mongoDB/controller/dailyMeasurement.controller'
import { getGuestDailyMeasurementsController } from '../mongoDB/controller/dailyMeasurements.controller'
import getUserByLogin from '../mongoDB/middleware/getUserByLogin';
import { analyzeCoachController, createCoachController } from '../mongoDB/controller/coach.controller';
import { findSchema } from '../mongoDB/schema/find.schema';
import { getAvatarController } from '../mongoDB/controller/images.controller';

const routes = (app: Express) => {
    app.post('/synchronization', requireUser, synchronizationUserSessionController)
    app.get('/avatar/:id', getAvatarController)

    app.post('/find/users', getUsersByLoginController)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionController)
    app.get('/auth/refresh', requireUser, refreshUserSessionController)
    app.post('/auth/change', requireUser, changeUserController)
    app.post('/auth/register', validateResource(createUserSchema as any), createUserController)
    app.delete('/auth/logout', deleteUserSessionController)
    app.post('/auth/confirm-email', validateResource(confirmEmailSchema), confirmUserController)
    app.post('/auth/reset-password', validateResource(resetPasswordSchema), resetPasswordController)
    app.post('/auth/reset-password-confirmation', validateResource(resetPasswordConfirmationSchema), resetPasswordConfirmationController)

    app.post('/find/product', getProductByCodeController)
    app.post('/find/products', validateResource(findSchema), getProductByNameController)
    app.post('/insert/product', requireUser, validateResource(createProductSchema), createProductController)
    app.post('/delete/product', requireUser, deleteManyProductController)

    app.post('/find/exercises', validateResource(findSchema), getExerciseByNameController)
    app.post('/insert/exercise', requireUser, validateResource(CreateExerciseSchema), createExerciseController)
    app.post('/delete/exercise', requireUser, deleteManyExerciseController)

    app.post('/guest/workout_plan', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlanController)
    app.post('/guest/workout_plans', getUserByLogin, validateResource(findSchema), getGuestWorkoutPlansController)
    app.post('/insert/workout_plan', requireUser, validateResource(CreateWorkoutPlanSchema), createWorkoutPlansController)
    app.post('/update/workout_plan', requireUser, validateResource(CreateWorkoutPlanSchema), updateWorkoutPlansController)
    app.post('/delete/workout_plan', requireUser, deleteWorkoutPlansController)

    app.post('/guest/daily_measurement', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementController)
    app.post('/guest/daily_measurements', getUserByLogin, validateResource(findSchema), getGuestDailyMeasurementsController)
    app.post('/insert/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), createDailyMeasurementController)
    app.post('/update/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), changeDailyMeasurementController)

    app.post('/coach/create', requireUser, createCoachController)
    app.post('/coach/create', requireUser, analyzeCoachController)
}

export default routes;