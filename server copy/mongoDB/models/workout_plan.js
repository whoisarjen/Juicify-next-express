const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'required!']
    }
}, { _id : false })

const workout_planSchema = new Schema({
    title: {
        type: String,
        required: [true, 'required!']
    },
    description: String,
    user_ID: {
        type: String,
        required: [true, 'required!']
    },
    burnt: Number,
    exercises: [exerciseSchema]
})

const workout_plan = mongoose.model('workout_plan', workout_planSchema)

module.exports = workout_plan