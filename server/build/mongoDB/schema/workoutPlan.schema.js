"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkoutPlanSchema = void 0;
const zod_1 = require("zod");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
exports.createWorkoutPlanSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        array: (0, zod_1.array)((0, zod_1.object)({
            title: (0, zod_1.string)({
                required_error: errorBook_1.default['TITLE IS REQUIRED']['VALUE']
            }),
            user_ID: (0, zod_1.string)({
                required_error: errorBook_1.default['USER IS REQUIRED']['VALUE']
            }),
            exercises: (0, zod_1.array)((0, zod_1.object)({
                _id: (0, zod_1.string)({
                    required_error: errorBook_1.default['EXERCISE IS REQUIRED']['VALUE']
                })
            }))
        }))
    })
});
