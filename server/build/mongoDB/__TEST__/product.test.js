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
const supertest_1 = __importDefault(require("supertest"));
const jwt_utils_1 = require("../../utils/jwt.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const _test_utils_1 = require("./_test.utils");
const server_1 = __importDefault(require("../../utils/server"));
const connect_1 = __importDefault(require("../../utils/connect"));
// find products
// create products
// create products auth
// delete products
// delete products auth
const app = (0, server_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, connect_1.default)(); }))();
let productPayload = {
    _id: new mongoose_1.default.Types.ObjectId().toString(),
    name: "Megan",
};
describe('find products route', () => {
    describe('given the find string', () => {
        it('should return an array with products', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post(`/find/products`).send({
                find: 'mleko'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({ items: expect.any(Array) });
        }));
    });
});
describe('create product route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app).post(`/insert/product`);
            expect(statusCode).toBe(403);
        }));
    });
});
describe('create product route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const jwt = (0, jwt_utils_1.signJWT)(_test_utils_1.userPayload);
            const { statusCode, body } = yield (0, supertest_1.default)(app)
                .post("/insert/product")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                array: [productPayload]
            });
            expect(statusCode).toBe(200);
            productPayload = body[0];
            expect(body).toEqual([{
                    _id: expect.any(String),
                    name: productPayload.name,
                    user_ID: _test_utils_1.userPayload._id,
                    l: productPayload.name.length,
                    "__v": 0,
                }]);
        }));
    });
});
describe('delete product route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app).post(`/delete/product`);
            expect(statusCode).toBe(403);
        }));
    });
});
describe('delete product route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const jwt = (0, jwt_utils_1.signJWT)(_test_utils_1.userPayload);
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/delete/product")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                array: [productPayload]
            });
            expect(statusCode).toBe(200);
        }));
    });
});
