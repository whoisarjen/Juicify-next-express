import supertest from 'supertest'
import createServer from '../../utils/server';
import connect from '../../utils/connect';

const app = createServer();
(async () => await connect())()

describe('guest dailyMeasurement route', () => {
    describe('given the login for public profile and date', () => {
        it('should return 200, user data and dailyMeasurement', async () => {
            const { statusCode, body } = await supertest(app)
                .post("/guest/daily_measurement")
                .send({
                    uniqueKey: '2022-01-22',
                    login: 'Arjen'
                });

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                user: expect.any(Object),
                data: expect.any(Object)
            })
        })
    })
})

describe('guest dailyMeasurement route', () => {
    describe('given the login for NOT public profile', () => {
        it('should return 200 and only user', async () => {
            const { statusCode, body } = await supertest(app)
                .post("/guest/daily_measurement")
                .send({
                    uniqueKey: '2022-01-22',
                    login: 'Pycior'
                });

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                user: expect.any(Object)
            })
        })
    })
})

describe('guest dailyMeasurement route', () => {
    describe('given the login, which is empty', () => {
        it('should return 401', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurement")
                .send({
                    login: ''
                });

            expect(statusCode).toBe(401)
        })
    })
})

describe('guest dailyMeasurement route', () => {
    describe('given the login and wrong date', () => {
        it('should return 400', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurement")
                .send({
                    login: 'Arjen',
                    whenAdded: 'itshouldntwork'
                });

            expect(statusCode).toBe(400)
        })
    })
})

describe('guest dailyMeasurement route', () => {
    describe('given the login, which is FAKE', () => {
        it('should return 404', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurement")
                .send({
                    login: '&*@#%&$#*%$*#(%$#*(%&$#*(%&#$(&%*$#$&#%*#$&%(*$#(*$#'
                });

            expect(statusCode).toBe(404)
        })
    })
})