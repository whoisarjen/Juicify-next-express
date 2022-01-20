"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        login: (0, zod_1.string)({
            required_error: errorBook_1.default['LOGIN IS REQUIRED']['VALUE']
        }),
        password: (0, zod_1.string)({
            required_error: errorBook_1.default['PASSWORD IS REQUIRED']['VALUE']
        }),
        passwordConfirmation: (0, zod_1.string)({
            required_error: errorBook_1.default['PASSWORD CONFIRMATION IS REQUIRED']['VALUE']
        }),
        email: (0, zod_1.string)({
            required_error: errorBook_1.default['EMAIL IS REQUIRED']['VALUE']
        })
            .email(errorBook_1.default['EMAIL IS NOT VALID']['VALUE']),
        height: (0, zod_1.number)({
            required_error: errorBook_1.default['HEIGHT IS REQUIRED']['VALUE']
        }),
        birth: (0, zod_1.string)({
            required_error: errorBook_1.default['BIRTHDAY IS REQUIRED']['VALUE']
        }),
        sex: (0, zod_1.boolean)({
            required_error: errorBook_1.default['SEX IS REQUIRED']['VALUE']
        })
    }).refine(data => data.password === data.passwordConfirmation, {
        message: errorBook_1.default['PASSWORDS DO NOT MATCH']['VALUE'],
        path: ['passwordConfirmation']
    })
});
