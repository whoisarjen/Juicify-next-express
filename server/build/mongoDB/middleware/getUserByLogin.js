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
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
const guest_utils_1 = require("../../utils/guest.utils");
const logger_1 = __importDefault(require("../../utils/logger"));
const user_service_1 = require("../service/user.service");
function getUserByLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.login) {
            logger_1.default.error('getUserByLogin kicked out cheater', req.body);
            return res.status(errorBook_1.default['LOGIN IS REQUIRED']['CODE']).send(errorBook_1.default['LOGIN IS REQUIRED']['VALUE']);
        }
        const user = yield (0, user_service_1.getUser)({ login: req.body.login });
        if (!user || (user && user.public_profile === 0)) {
            if (user) {
                return res.send({
                    user: (yield (0, guest_utils_1.removeUsersSensitiveData)([user]))[0]
                });
            }
            else {
                logger_1.default.error(`Someone try to see not existing user ${req.body.login}.`);
                console.log(errorBook_1.default['USER NOT AVAILABLE']['CODE']);
                return res.status(errorBook_1.default['USER NOT AVAILABLE']['CODE']).send(errorBook_1.default['USER NOT AVAILABLE']['VALUE']);
            }
        }
        res.locals.user = user;
        next();
    });
}
exports.default = getUserByLogin;
