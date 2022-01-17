import { Express, Request, Response } from 'express'
import { createProductHandler } from '../mongoDB/controller/product.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createProductSchema } from '../mongoDB/schema/product.schema'

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.get('/test', validateResource(createProductSchema), createProductHandler)
}

export default routes;