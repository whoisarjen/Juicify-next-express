const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user_macronutrientSchema = new Schema({
    proteins: {
        type: Number,
        required: [true, 'required!']
    },
    carbs: {
        type: Number,
        required: [true, 'required!']
    },
    fats: {
        type: Number,
        required: [true, 'required!']
    },
    day: {
        type: Number,
        required: [true, 'required!']
    },
}, { _id : false })

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'required!']
    },
    email_confirmation: {
        type: Boolean,
        default: false
    },
    login: {
        type: String,
        unique: true,
        required: [true, 'required!']
    },
    l: {
        type: Number,
        required: [true, 'required!']
    },
    password: {
        type: String,
        required: [true, 'required!']
    },
    password_remind_hash: String,
    sex: {
        type: Boolean,
        required: [true, 'required!']
    },
    lang: {
        type: String,
        required: [true, 'required!']
    },
    meal_number: {
        type: Number,
        default: 5
    },
    users_roles_ID: {
        type: Number,
        default: 1
    },
    public_profile: {
        type: Number,
        default: 1
    },
    height: {
        type: Number,
        required: [true, 'required!']
    },
    birth: {
        type: String,
        required: [true, 'required!']
    },
    goal: {
        type: Number,
        default: 0
    },
    coach: {
        type: String,
        default: '2020-01-01'
    },
    coach_analyze: {
        type: Boolean,
        default: false
    },
    registered: {
        type: String,
        default: new Date().toISOString()
    },
    premium: {
        type: String,
        default: new Date().toISOString()
    },
    twitter: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    facebook: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    banned: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Boolean,
        default: false
    },
    water_adder: {
        type: Boolean,
        default: true
    },
    workout_watch: {
        type: Boolean,
        default: true
    },
    kind_of_diet: {
        type: Number,
        default: 0
    },
    sport_active: {
        type: Boolean,
        default: true
    },
    reverse_diet: {
        type: Boolean,
        default: false
    },
    activity: {
        type: Number,
        default: 1
    },
    useProteinsG: {
        type: Boolean,
        default: false
    },
    proteinsG: Number,
    proteins: Number,
    carbs: Number,
    fats: Number,
    fiber: {
        type: Number,
        default: 25
    },
    sugar_percent: {
        type: Number,
        default: 10
    },
    macronutrients: [user_macronutrientSchema]
})

const user = mongoose.model('user', userSchema)

module.exports = user