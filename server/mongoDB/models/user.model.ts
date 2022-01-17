import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface MacronutrientsProps extends mongoose.Document {
    proteins: number,
    carbs: number,
    fats: number
}

export interface UserProps extends mongoose.Document {
    _id: string;
    email: string,
    email_confirmation: boolean,
    login: string,
    l: number,
    password: string,
    password_remind_hash: string,
    sex: boolean,
    meal_number: number,
    users_roles_ID: number,
    public_profile: number,
    height: number,
    birth: string,
    goal: number,
    coach: string,
    coach_analyze: boolean,
    registered: Date,
    premium: Date,
    twitter: string,
    website: string,
    facebook: string,
    instagram: string,
    name: string,
    surname: string,
    description: string,
    banned: boolean,
    avatar: boolean,
    water_adder: boolean,
    workout_watch: boolean,
    kind_of_diet: number,
    sport_active: boolean,
    activity: number,
    useProteinsG: boolean,
    fiber: number,
    sugar_percent: number,
    macronutrients: Array<MacronutrientsProps>
    comparePassword(candidatePassword: string): Promise<boolean>
}

const macronutrientsSchema = new mongoose.Schema({
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
}, { _id: false })

const userSchema = new mongoose.Schema({
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
        type: Date,
        default: new Date()
    },
    premium: {
        type: Date,
        default: new Date()
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
    activity: {
        type: Number,
        default: 1
    },
    useProteinsG: {
        type: Boolean,
        default: false
    },
    fiber: {
        type: Number,
        default: 25
    },
    sugar_percent: {
        type: Number,
        default: 10
    },
    macronutrients: [macronutrientsSchema]
})

// userSchema.pre("save", async (next) => {
//     let user = this as UserProps

//     if (user.isModified('password')) {
//         return next();
//     } else {
//         const salt = await bcrypt.genSalt(config.get<number>('SALT_WORK_FACTORY'));

//         const hash = await bcrypt.hashSync(user.password, salt);

//         user.password = hash;

//         return next();
//     }
// })

// userSchema.methods.comaprePassword = async (candidatePassword: string): Promise<boolean> => {
//     const user = this as UserProps;

//     return bcrypt.compare(candidatePassword, user.password).catch(e => false)
// }

export const UserModel = mongoose.model('Model', userSchema);