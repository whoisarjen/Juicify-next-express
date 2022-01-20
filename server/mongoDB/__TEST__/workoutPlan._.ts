// import supertest from 'supertest'
// import { signJWT } from '../../utils/jwt.utils';
// import mongoose from 'mongoose';
// import { userPayload } from './_test.utils';
// import createServer from '../../utils/server';
// import connect from '../../utils/connect';

// // find workoutPlans
// // create workoutPlans
// // create workoutPlans auth
// // delete workoutPlans
// // delete workoutPlans auth

// const app = createServer();
// (async () => await connect())()

// let workoutPlanPayload = {
//     _id: new mongoose.Types.ObjectId().toString(),
//     name: "Megan's workoutPlan",
//     exercises: [{
//         _id: '61b1b790ffa5227c6247d5cd'
//     }]
// };

// describe('find workoutPlans route', () => {
//     describe('given the find string', () => {
//         it('should return an array with workoutPlans', async () => {
//             const { statusCode, body } = await supertest(app).post(`/find/workoutPlans`).send({
//                 _id: '61c1cfa6535b03d0d3524a93'
//             })

//             expect(statusCode).toBe(200)
//             console.log(body)
//             expect(body).toEqual({ items: expect.any(Array) })
//         })
//     })
// })

// describe('create workoutPlan route', () => {
//     describe('given the user is not logged in', () => {
//         it('should return a 403 error', async () => {
//             const { statusCode } = await supertest(app).post(`/insert/workout_plan`)
//             expect(statusCode).toBe(403)
//         })
//     })
// })

// // describe('create workoutPlan route', () => {
// //     describe('given the user is logged in', () => {
// //         it('should return a 200 and new workoutPlan', async () => {
// //             const jwt = signJWT(userPayload);

// //             const { statusCode, body } = await supertest(app)
// //                 .post("/insert/workoutPlan")
// //                 .set("Authorization", `Bearer ${jwt}`)
// //                 .send({
// //                     array: [workoutPlanPayload]
// //                 });

// //             expect(statusCode).toBe(200)
// //             workoutPlanPayload = body[0]
// //             expect(body).toEqual([{
// //                 _id: expect.any(String),
// //                 name: workoutPlanPayload.name,
// //                 user_ID: userPayload._id,
// //                 l: workoutPlanPayload.name.length,
// //                 "__v": 0,
// //             }])
// //         })
// //     })
// // })

// // describe('delete workoutPlan route', () => {
// //     describe('given the user is not logged in', () => {
// //         it('should return a 403 error', async () => {
// //             const { statusCode } = await supertest(app).post(`/delete/workoutPlan`)
// //             expect(statusCode).toBe(403)
// //         })
// //     })
// // })

// // describe('delete workoutPlan route', () => {
// //     describe('given the user is logged in', () => {
// //         it('should return a 200 and new workoutPlan', async () => {
// //             const jwt = signJWT(userPayload);

// //             const { statusCode } = await supertest(app)
// //                 .post("/delete/workoutPlan")
// //                 .set("Authorization", `Bearer ${jwt}`)
// //                 .send({
// //                     array: [workoutPlanPayload]
// //                 });

// //             expect(statusCode).toBe(200)
// //         })
// //     })
// // })