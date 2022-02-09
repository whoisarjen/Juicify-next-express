import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.token;

    if (!user) {
        return res.sendStatus(403);
    }

    if (req.body.array && req.body.array.length) {
        for (let i = 0; i < req.body.array.length; i++) {
            req.body.array[i].user_ID = user._id
        }
    }

    return next();
};

export default requireUser;