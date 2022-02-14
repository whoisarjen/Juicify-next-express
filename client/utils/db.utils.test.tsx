import { getOnline } from "./db.utils";
import { insertThoseIDStoDB } from './db.utils'

describe('checking offline / online global value', () => {
    it('Expect isOnline to be offline', () => {
        const isOnline = getOnline()

        expect(isOnline).toBe(false)
    })
})

describe(`checking insertThoseIDStoDB's returned value in OFFLINE`, () => {
    describe('Gave array with _id', () => {
        it('Expect get back same value', async () => {
            // const response = await insertThoseIDStoDB('daily_measurement', [{ _id: 'test' }])

            // console.log(response)
        })
    })
})

export default {};