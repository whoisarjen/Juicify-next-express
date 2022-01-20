"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const tokenKey = config_1.default.get('TOKEN_KEY');
function signJWT(object, options) {
    return jsonwebtoken_1.default.sign(object, tokenKey, Object.assign({}, (options && options)));
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
}
exports.verifyJWT = verifyJWT;
