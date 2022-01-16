const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        required: [true, 'required!']
    },
    whenAdded: {
        type: Date,
        required: [true, 'required!']
    },
    user_ID: {
        type: String,
        required: [true, 'required!']
    },
    customer_ID: {
        type: String,
        required: [true, 'required!']
    }
})

const message = mongoose.model('message', messageSchema)

module.exports = message