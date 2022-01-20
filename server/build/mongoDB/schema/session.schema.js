"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
exports.createSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        login: (0, zod_1.string)({
            required_error: errorBook_1.default['LOGIN IS REQUIRED']['VALUE']
        }),
        password: (0, zod_1.string)({
            required_error: errorBook_1.default['PASSWORD IS REQUIRED']['VALUE']
        })
    })
});
