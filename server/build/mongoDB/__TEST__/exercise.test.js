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
// find exercises
// create exercises
// create exercises auth
// delete exercises
// delete exercises auth
const app = (0, server_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, connect_1.default)(); }))();
let exercisePayload = {
    _id: new mongoose_1.default.Types.ObjectId().toString(),
    name: "Megan's exercise",
};
describe('find exercises route', () => {
    describe('given the find string', () => {
        it('should return an array with exercises', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post(`/find/exercises`).send({
                find: 'wyciskanie'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({ items: expect.any(Array) });
        }));
    });
});
describe('create exercise route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app).post(`/insert/exercise`);
            expect(statusCode).toBe(403);
        }));
    });
});
describe('create exercise route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new exercise', () => __awaiter(void 0, void 0, void 0, function* () {
            const jwt = (0, jwt_utils_1.signJWT)(_test_utils_1.userPayload);
            const { statusCode, body } = yield (0, supertest_1.default)(app)
                .post("/insert/exercise")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                array: [exercisePayload]
            });
            expect(statusCode).toBe(200);
            exercisePayload = body[0];
            expect(body).toEqual([{
                    _id: expect.any(String),
                    name: exercisePayload.name,
                    user_ID: _test_utils_1.userPayload._id,
                    l: exercisePayload.name.length,
                    "__v": 0,
                }]);
        }));
    });
});
describe('delete exercise route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app).post(`/delete/exercise`);
            expect(statusCode).toBe(403);
        }));
    });
});
describe('delete exercise route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new exercise', () => __awaiter(void 0, void 0, void 0, function* () {
            const jwt = (0, jwt_utils_1.signJWT)(_test_utils_1.userPayload);
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/delete/exercise")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                array: [exercisePayload]
            });
            expect(statusCode).toBe(200);
        }));
    });
});
