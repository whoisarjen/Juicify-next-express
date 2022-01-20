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
exports.getUsersByLoginHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const user_service_1 = require("../service/user.service");
const lodash_1 = require("lodash");
const guest_utils_1 = require("../../utils/guest.utils");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((new Date(req.body.birth)).toString() === 'Invalid Date') {
            throw errorBook_1.default['BIRTHDAY IS REQUIRED']['VALUE'];
        }
        const user = yield (0, user_service_1.createUser)(Object.assign(Object.assign({}, req.body), { birth: new Date(req.body.birth) }));
        return res.send((0, lodash_1.omit)(user, 'password'));
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.createUserHandler = createUserHandler;
const getUsersByLoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getUsersByLogin)(req.body.find);
        const items = yield (0, guest_utils_1.removeUsersSensitiveData)(users);
        return res.send({ items });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
});
exports.getUsersByLoginHandler = getUsersByLoginHandler;
