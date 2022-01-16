import ExerciseProps from "../../interfaces/exercise";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const exerciseSchema: ExerciseProps = new Schema({
    name: {
        type: String,
        text: true,
        required: [true, 'required!']
    },
    user_ID: String,
    l: Number
})

const exerciseModel = mongoose.model('exercise', exerciseSchema)

export default exerciseModel;