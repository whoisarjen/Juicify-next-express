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
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const config_1 = __importDefault(require("config"));
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, lodash_1.get)(req, 'cookies.token') || (0, lodash_1.get)(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    const refresh_token = (0, lodash_1.get)(req, 'cookies.refresh_token') || (0, lodash_1.get)(req, 'headers.x-refresh', '').replace(/^Bearer\s/, '');
    if (!token) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJWT)(token);
    if (decoded) {
        res.locals.token = decoded;
    }
    if (expired && refresh_token) {
        const newToken = yield (0, session_service_1.reIssueAccessToken)(refresh_token);
        if (newToken) {
            res.setHeader('x-access-token', newToken);
            res.cookie('token', newToken, {
                maxAge: config_1.default.get('COOKIE_TOKEN_LIFE_TIME_IN_S'),
                httpOnly: config_1.default.get('COOKIE_HTTPONLY'),
                domain: config_1.default.get('COOKIE_DOMAIN'),
                path: '/',
                sameSite: 'strict',
                secure: config_1.default.get('COOKIE_SECURE')
            });
            const result = (0, jwt_utils_1.verifyJWT)(newToken);
            res.locals.token = result.decoded;
        }
    }
    return next();
});
exports.default = deserializeUser;
