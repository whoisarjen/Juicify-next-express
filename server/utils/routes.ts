import { Express } from 'express'
import { createUserHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductHandler, deleteManyProductHandler } from '../mongoDB/controller/product.controller';
import { createExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseHandler, deleteManyExerciseHandler } from '../mongoDB/controller/exercise.controller';
import { createWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlanHandler, deleteManyWorkoutPlanHandler } from '../mongoDB/controller/workoutPlan.controller';

const routes = (app: Express) => {
    // app.post('/register', validateResource(createUserSchema), createUserHandler)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionHandler)
    // app.get('/login', requireUser, getUserSessionHandler)
    // app.delete('/login', requireUser, deleteUserSessionHandler)
    
    app.post('/create/product', requireUser, validateResource(createProductSchema), createProductHandler)
    app.post('/delete/product', requireUser, deleteManyProductHandler)
    
    app.post('/create/exercise', requireUser, validateResource(createExerciseSchema), createExerciseHandler)
    app.post('/delete/exercise', requireUser, deleteManyExerciseHandler)
    
    
    app.post('/create/workout_plan', requireUser, validateResource(createWorkoutPlanSchema), createWorkoutPlanHandler)
    app.post('/delete/workout_plan', requireUser, deleteManyWorkoutPlanHandler)
}

export default routes;