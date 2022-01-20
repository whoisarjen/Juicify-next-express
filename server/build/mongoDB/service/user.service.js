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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByLogin = exports.getUser = exports.validatePassword = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const lodash_1 = require("lodash");
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.create(input);
        return (0, lodash_1.omit)(user.toJSON(), 'password');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createUser = createUser;
function validatePassword({ login, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.findOne({ login });
        if (!user) {
            return false;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid) {
            return false;
        }
        return (0, lodash_1.omit)(user.toJSON(), 'password');
    });
}
exports.validatePassword = validatePassword;
function getUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.findOne(query).lean();
    });
}
exports.getUser = getUser;
const getUsersByLogin = (find) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find({
            login: { '$regex': find, '$options': 'i' }
        })
            .limit(10)
            .sort({ l: 1 });
        return users;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUsersByLogin = getUsersByLogin;
