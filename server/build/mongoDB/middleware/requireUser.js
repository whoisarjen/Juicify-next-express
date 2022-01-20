"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    console.log(req.body);
    const user = res.locals.token;
    if (!user) {
        return res.sendStatus(403);
    }
    if (req.body.array && req.body.array.length) {
        req.body.array.forEach((x) => {
            x.user_ID = user._id;
            return x;
        });
    }
    return next();
};
exports.default = requireUser;
