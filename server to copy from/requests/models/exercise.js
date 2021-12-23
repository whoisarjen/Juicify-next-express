const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        text: true,
        required: [true, 'required!']
    },
    user_ID: String,
    l: Number
})

const exercise = mongoose.model('exercise', exerciseSchema)

module.exports = exercise