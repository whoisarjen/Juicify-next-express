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
const server_1 = __importDefault(require("../../utils/server"));
const connect_1 = __importDefault(require("../../utils/connect"));
const _test_utils_1 = require("./_test.utils");
// login
// find users
// create user with fake date
// create user
const app = (0, server_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, connect_1.default)(); }))();
const password = (0, _test_utils_1.generateString)(10);
let userPayload = {
    "login": (0, _test_utils_1.generateString)(10),
    "password": password,
    "passwordConfirmation": password,
    "email": `${(0, _test_utils_1.generateString)(10)}@wp.pl`,
    "height": 150,
    "sex": true,
    "birth": new Date("2022-01-17").toJSON(),
    "public_profile": 0
};
describe('login user route', () => {
    describe('given the register data', () => {
        it("should return user's session data", () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post(`/auth/login`).send({
                login: 'Arjen',
                password: 'Preetini49e89d5b'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                token: expect.any(String),
                refresh_token: expect.any(String),
                product: expect.any(Array),
                exercise: expect.any(Array),
                workout_plan: expect.any(Array),
                daily_measurement: expect.any(Array)
            });
        }));
    });
});
describe('find users route', () => {
    describe('given the find string', () => {
        it('should return an array with users', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post(`/find/users`).send({
                find: 'who'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({ items: expect.any(Array) });
        }));
    });
});
describe.skip('register user route', () => {
    describe("given the user's NOT correct birth", () => {
        it('should return a 409 error', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(userPayload);
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/auth/register")
                .send(Object.assign(Object.assign({}, userPayload), { birth: '12312312312' }));
            expect(statusCode).toBe(409);
        }));
    });
});
describe('register user route', () => {
    describe("given the user's correct data", () => {
        it('should return a 200 and a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app)
                .post("/auth/register")
                .send(userPayload);
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.any(Object));
        }));
    });
});
