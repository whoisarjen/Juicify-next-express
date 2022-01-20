"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    user_ID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: String
}, {
    timestamps: true
});
exports.SessionModel = mongoose_1.default.model('session', sessionSchema);
