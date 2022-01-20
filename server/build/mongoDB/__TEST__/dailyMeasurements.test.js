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
const app = (0, server_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, connect_1.default)(); }))();
const addDaysToDate = (date = new Date(), days) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10);
};
describe('guest dailyMeasurements route', () => {
    describe('given the login for public profile and date', () => {
        it('should return 200, user data and dailyMeasurements', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app)
                .post("/guest/daily_measurements")
                .send({
                uniqueKey: addDaysToDate(new Date(), -7),
                login: 'Arjen'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                user: expect.any(Object),
                data: expect.any(Array)
            });
        }));
    });
});
describe('guest dailyMeasurements route', () => {
    describe('given the login for NOT public profile', () => {
        it('should return 200 and only user', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app)
                .post("/guest/daily_measurements")
                .send({
                uniqueKey: addDaysToDate(new Date(), -7),
                login: 'Pycior'
            });
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                user: expect.any(Object),
                // data: expect.any(Array)
            });
        }));
    });
});
describe('guest dailyMeasurements route', () => {
    describe('given the login, which is empty', () => {
        it('should return 401', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/guest/daily_measurements")
                .send({
                login: ''
            });
            expect(statusCode).toBe(401);
        }));
    });
});
describe('guest dailyMeasurements route', () => {
    describe('given the login and wrong date', () => {
        it('should return 401', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/guest/daily_measurements")
                .send({
                login: 'Arjen',
                whenAdded: 'itshouldntwork'
            });
            expect(statusCode).toBe(401);
        }));
    });
});
describe('guest dailyMeasurements route', () => {
    describe('given the login, which is FAKE', () => {
        it('should return 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(app)
                .post("/guest/daily_measurements")
                .send({
                login: '&*@#%&$#*%$*#(%$#*(%&$#*(%&#$(&%*$#$&#%*#$&%(*$#(*$#'
            });
            expect(statusCode).toBe(404);
        }));
    });
});
