import supertest from 'supertest'
import createServer from '../../utils/server';
import connect from '../../utils/connect';
import { generateString } from './_test.utils';

// login
// find users
// create user with fake date
// create user

const app = createServer();
(async () => await connect())()

const password = generateString(10)

let userPayload = {
    "login": generateString(10),
    "password": password,
    "passwordConfirmation": password,
    "email": `${generateString(10)}@wp.pl`,
    "height": 150,
    "sex": true,
    "birth": new Date("2022-01-17").toJSON(),
    "public_profile": 0
}

describe('login user route', () => {
    describe('given the register data', () => {
        it("should return user's session data", async () => {
            const { statusCode, body } = await supertest(app).post(`/auth/login`).send({
                login: 'Arjen',
                password: 'Preetini49e89d5b'
            })

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                token: expect.any(String),
                refresh_token: expect.any(String),
                product: expect.any(Array),
                exercise: expect.any(Array),
                workout_plan: expect.any(Array),
                daily_measurement: expect.any(Array)
            })
        })
    })
})

describe('find users route', () => {
    describe('given the find string', () => {
        it('should return an array with users', async () => {
            const { statusCode, body } = await supertest(app).post(`/find/users`).send({
                find: 'who'
            })

            expect(statusCode).toBe(200)
            expect(body).toEqual({ items: expect.any(Array) })
        })
    })
})

describe.skip('register user route', () => {
    describe("given the user's NOT correct birth", () => {
        it('should return a 409 error', async () => {
            console.log(userPayload)
            const { statusCode } = await supertest(app)
                .post("/auth/register")
                .send({ ...userPayload, birth: '12312312312' });
            expect(statusCode).toBe(409)
        })
    })
})

describe('register user route', () => {
    describe("given the user's correct data", () => {
        it('should return a 200 and a new user', async () => {
            const { statusCode, body } = await supertest(app)
                .post("/auth/register")
                .send(userPayload);
            expect(statusCode).toBe(200)
            expect(body).toEqual(expect.any(Object))
        })
    })
})