import supertest from 'supertest'
import createServer from '../../utils/server';
import connect from '../../utils/connect';

const app = createServer();
(async () => await connect())()

const addDaysToDate = (date: Date | string = new Date(), days: number) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}

describe('guest dailyMeasurements route', () => {
    describe('given the login for public profile and date', () => {
        it('should return 200, user data and dailyMeasurements', async () => {
            const { statusCode, body } = await supertest(app)
                .post("/guest/daily_measurements")
                .send({
                    uniqueKey: addDaysToDate(new Date(), -7),
                    login: 'Arjen'
                });

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                user: expect.any(Object),
                data: expect.any(Array)
            })
        })
    })
})

describe('guest dailyMeasurements route', () => {
    describe('given the login for NOT public profile', () => {
        it('should return 200 and only user', async () => {
            const { statusCode, body } = await supertest(app)
                .post("/guest/daily_measurements")
                .send({
                    uniqueKey: addDaysToDate(new Date(), -7),
                    login: 'Pycior'
                });

            expect(statusCode).toBe(200)
            expect(body).toEqual({
                user: expect.any(Object),
                // data: expect.any(Array)
            })
        })
    })
})

describe('guest dailyMeasurements route', () => {
    describe('given the login, which is empty', () => {
        it('should return 401', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurements")
                .send({
                    login: ''
                });

            expect(statusCode).toBe(401)
        })
    })
})

describe('guest dailyMeasurements route', () => {
    describe('given the login and wrong date', () => {
        it('should return 400', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurements")
                .send({
                    login: 'Arjen',
                    whenAdded: 'itshouldntwork'
                });

            expect(statusCode).toBe(400)
        })
    })
})

describe('guest dailyMeasurements route', () => {
    describe('given the login, which is FAKE', () => {
        it('should return 404', async () => {
            const { statusCode } = await supertest(app)
                .post("/guest/daily_measurements")
                .send({
                    login: '&*@#%&$#*%$*#(%$#*(%&$#*(%&#$(&%*$#$&#%*#$&%(*$#(*$#'
                });

            expect(statusCode).toBe(404)
        })
    })
})