import supertest from 'supertest'
import { signJWT } from '../../utils/jwt.utils';
import mongoose from 'mongoose';
import { userPayload } from './_test.utils';
import createServer from '../../utils/server';
import connect from '../../utils/connect';

// find products
// create products
// create products auth
// delete products
// delete products auth

const app = createServer();
(async () => await connect())()

let productPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Megan",
};

describe('find products route', () => {
    describe('given the find string', () => {
        it('should return an array with products', async () => {
            const { statusCode, body } = await supertest(app).post(`/find/products`).send({
                find: 'mleko'
            })

            expect(statusCode).toBe(200)
            expect(body).toEqual({ items: expect.any(Array) })
        })
    })
})

describe('create product route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', async () => {
            const { statusCode } = await supertest(app).post(`/insert/product`)
            expect(statusCode).toBe(403)
        })
    })
})

describe('create product route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new product', async () => {
            const jwt = signJWT(userPayload);

            const { statusCode, body } = await supertest(app)
                .post("/insert/product")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    array: [productPayload]
                });

            expect(statusCode).toBe(200)
            productPayload = body[0]
            expect(body).toEqual([{
                _id: expect.any(String),
                name: productPayload.name,
                user_ID: userPayload._id,
                l: productPayload.name.length,
                "__v": 0,
            }])
        })
    })
})

describe('delete product route', () => {
    describe('given the user is not logged in', () => {
        it('should return a 403 error', async () => {
            const { statusCode } = await supertest(app).post(`/delete/product`)
            expect(statusCode).toBe(403)
        })
    })
})

describe('delete product route', () => {
    describe('given the user is logged in', () => {
        it('should return a 200 and new product', async () => {
            const jwt = signJWT(userPayload);

            const { statusCode } = await supertest(app)
                .post("/delete/product")
                .set("Authorization", `Bearer ${jwt}`)
                .send({
                    array: [productPayload]
                });

            expect(statusCode).toBe(200)
        })
    })
})