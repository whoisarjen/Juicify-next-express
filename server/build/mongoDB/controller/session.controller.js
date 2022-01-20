"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
const session_service_1 = require("../service/session.service");
const config_1 = __importDefault(require("config"));
const jwt_utils_1 = require("../../utils/jwt.utils");
const product_service_1 = require("../service/product.service");
const exercise_service_1 = require("../service/exercise.service");
const workoutPlan_service_1 = require("../service/workoutPlan.service");
const dailyMeasurement_service_1 = require("../service/dailyMeasurement.service");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(errorBook_1.default['INVALID LOGIN OR PASSWORD']['CODE']).send(errorBook_1.default['INVALID LOGIN OR PASSWORD']['VALUE']);
        }
        const session = yield (0, session_service_1.createSession)(user._id, req.get('user-agent') || '');
        const token = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('TOKEN_LIFE_TIME_IN_S') + 's' });
        const refresh_token = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('REFRESH_TOKEN_LIFE_TIME_IN_S') + 's' });
        const product = yield (0, product_service_1.getUserProducts)(user);
        const exercise = yield (0, exercise_service_1.getUserExercises)(user);
        const workout_plan = yield (0, workoutPlan_service_1.getUserWorkoutPlans)(user);
        const daily_measurement = yield (0, dailyMeasurement_service_1.getUserDailyMeasurements)(user);
        res.cookie('token', token, {
            maxAge: config_1.default.get('COOKIE_TOKEN_LIFE_TIME_IN_S'),
            httpOnly: config_1.default.get('COOKIE_HTTPONLY'),
            domain: config_1.default.get('COOKIE_DOMAIN'),
            path: '/',
            sameSite: 'strict',
            secure: config_1.default.get('COOKIE_SECURE')
        });
        res.cookie('refresh_token', refresh_token, {
            maxAge: config_1.default.get('COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S'),
            httpOnly: config_1.default.get('COOKIE_HTTPONLY'),
            domain: config_1.default.get('COOKIE_DOMAIN'),
            path: '/',
            sameSite: 'strict',
            secure: config_1.default.get('COOKIE_SECURE')
        });
        return res.send({
            token,
            refresh_token,
            product,
            exercise,
            workout_plan,
            daily_measurement
        });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
// export async function getUserSessionHandler(req: Request, res: Response) {
//     const user = res.locals.token
//     const sessions = await findSessions({ user: user._id, valid: true })
//     return res.send(sessions);
// }
// export async function deleteUserSessionHandler(req: Request, res: Response) {
//     const sessionId = res.locals.token.session
//     await updateSession({ _id: sessionId }, { valid: false })
//     return res.send({
//         token: null,
//         refresh_token: null
//     })
// }
