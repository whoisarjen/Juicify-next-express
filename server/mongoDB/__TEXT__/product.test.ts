import supertest from 'supertest'
import { signJWT } from '../../utils/jwt.utils';
import createServer from '../../utils/server'
import mongoose from 'mongoose';
import connect from '../../utils/connect';

const app = createServer();

(async () => await connect())()

const userPayload = {
    "premium": "2022-01-19T20:46:31.766Z",
    "_id": "60ba774fe0ecd72587eeaa29",
    "email_confirmation": true,
    "meal_number": 5,
    "users_roles_ID": 9999,
    "public_profile": 1,
    "goal": 0,
    "coach": "2022-01-17",
    "registered": "2021-06-04",
    "banned": false,
    "avatar": true,
    "fiber": 10,
    "sugar_percent": 10,
    "water_adder": true,
    "workout_watch": true,
    "login": "Arjen",
    "email": "Kamilow97@gmail.com",
    "height": 190,
    "birth": "1997-01-31",
    "sex": true,
    "__v": 0,
    "password_remind_hash": "h5ZN7lmZUuCSUCSPIk6VVKdoenXg1Z",
    "description": "Loremipsum–tekstskładającysięzłacińskichiquasi-łacińskichwyrazów,mającykorzeniewklasycznejłacinie,wzorowanynafragmencietraktatuCycerona„Ogranicachdobraizła”napisanegow45p.n.e.Tekstjeststosowanydodemonstracjikrojówpisma",
    "facebook": "kamil.owczarek.1",
    "instagram": "whoisarjen",
    "name": "Kamil",
    "surname": "Owczarek",
    "twitter": "whoisarjen",
    "website": "arjenworld.pl",
    "macronutrients": [
        {
            "proteins": 136,
            "carbs": 751,
            "fats": 73,
            "day": 1
        },
        {
            "proteins": 136,
            "carbs": 189,
            "fats": 73,
            "day": 2
        },
        {
            "proteins": 136,
            "carbs": 190,
            "fats": 73,
            "day": 3
        },
        {
            "proteins": 136,
            "carbs": 191,
            "fats": 73,
            "day": 4
        },
        {
            "proteins": 136,
            "carbs": 810,
            "fats": 73,
            "day": 5
        },
        {
            "proteins": 136,
            "carbs": 191,
            "fats": 73,
            "day": 6
        },
        {
            "proteins": 136,
            "carbs": 191,
            "fats": 73,
            "day": 7
        }
    ],
    "activity": 1.375,
    "kind_of_diet": 0,
    "sport_active": true,
    "lang": "en",
    "l": 5,
    "reverse_diet": false,
    "coach_analyze": true,
    "carbs": 45,
    "fats": 30,
    "proteins": 25,
    "proteinsG": 200,
    "useProteinsG": true,
    "calories": 1330,
    "session": "61e87d8488274c795791e696",
    "iat": 1642626436,
    "exp": 34492626436
}

const productPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Megan",
};

jest.setTimeout(30000);


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