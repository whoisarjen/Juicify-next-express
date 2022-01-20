import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const user = res.locals.token;
    if (!user) {
        return res.sendStatus(403);
    }

    if (req.body.array && req.body.array.length) {
        req.body.array.forEach((x: any) => {
            x.user_ID = user._id
            return x;
        })
    }

    return next();
};

export default requireUser;