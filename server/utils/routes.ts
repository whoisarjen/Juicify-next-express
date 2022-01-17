import { Express } from 'express'
import { createUserHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'

const routes = (app: Express) => {
    app.post('/register', validateResource(createUserSchema), createUserHandler)
    app.post('/login', validateResource(createSessionSchema), createUserSessionHandler)
    app.get('/login', requireUser, getUserSessionHandler)
    app.delete('/login', requireUser, deleteUserSessionHandler)
}

export default routes;