"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDailyMeasurementSchema = void 0;
const zod_1 = require("zod");
const errorBook_1 = __importDefault(require("../../utils/errorBook"));
exports.createDailyMeasurementSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        array: (0, zod_1.array)((0, zod_1.object)({
            whenAdded: (0, zod_1.preprocess)((val) => new Date(val.slice(0, 10)), (0, zod_1.date)({
                required_error: errorBook_1.default['DATE IS REQUIRED']['VALUE']
            })),
            // whenAdded: string({
            //     required_error: errorBook['DATE IS REQUIRED']['VALUE']
            // }),
            user_ID: (0, zod_1.string)({
                required_error: errorBook_1.default['USER IS REQUIRED']['VALUE']
            })
        }))
    })
});
