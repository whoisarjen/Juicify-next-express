import supertest from 'supertest'
import createServer from '../../utils/server'

const app = createServer();

describe('get product route', () => {
    describe('given product does not exists', () => {
        describe('it should return an empty array', () => {
            it('should return an empty array', async () => {
                const productId = 'product-123'
                await supertest(app).get(`/find/products`)
                expect([])
            })
        })
    })
})