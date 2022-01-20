import supertest from 'supertest'
import { signJWT } from '../../utils/jwt.utils';
import mongoose from 'mongoose';
import { userPayload } from './_test.utils';
import createServer from '../../utils/server';
import connect from '../../utils/connect';

// find exercises
// create exercises
// create exercises auth
// delete exercises
// delete exercises auth

const app = createServer();
(async () => await connect())()

let exercisePayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Megan's exercise",
};

describe('find exercises route', () => {
    describe('given the find string', () => {
        it('should return an array with exercises', async () => {
            const { statusCode, body } = await supertest(app).post(`/find/exercises`).send({
                find: 'wyciskanie'
            })

            expect(statusCode).toBe(200)
            expect(body).toEqual({ items: expect.any(Array) })
        })
    })
})

describe('create exercise route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', async () => {
            const { statusCode } = await supertest(app).post(`/insert/exercise`)
            expect(statusCode).toBe(403)
        })
    })
})

describe('create exercise route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new exercise', async () => {
            const jwt = signJWT(userPayload);

            const { statusCode, body } = await supertest(app)
                .post("/insert/exercise")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    array: [exercisePayload]
                });

            expect(statusCode).toBe(200)
            exercisePayload = body[0]
            expect(body).toEqual([{
                _id: expect.any(String),
                name: exercisePayload.name,
                user_ID: userPayload._id,
                l: exercisePayload.name.length,
                "__v": 0,
            }])
        })
    })
})

describe('delete exercise route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', async () => {
            const { statusCode } = await supertest(app).post(`/delete/exercise`)
            expect(statusCode).toBe(403)
        })
    })
})

describe('delete exercise route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new exercise', async () => {
            const jwt = signJWT(userPayload);

            const { statusCode } = await supertest(app)
                .post("/delete/exercise")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    array: [exercisePayload]
                });

            expect(statusCode).toBe(200)
        })
    })
})