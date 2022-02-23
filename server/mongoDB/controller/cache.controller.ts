import { NextFunction, Request, Response } from "express"
import { redis } from "../../utils/socket";

export const getProductsFromCache = async (req: Request, res: Response, next: NextFunction) => {
    const items = await redis.get(`products_${req.body.find}`);
    if (items) {
        return res.send({ items: JSON.parse(items) })
    }
    next();
}

export const getExercisesFromCache = async (req: Request, res: Response, next: NextFunction) => {
    const items = await redis.get(`exercises_${req.body.find}`);
    if (items) {
        return res.send({ items: JSON.parse(items) })
    }
    next();
}