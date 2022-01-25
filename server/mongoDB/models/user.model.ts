import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export interface MacronutrientsProps extends mongoose.Document {
    proteins: number,
    carbs: number,
    fats: number
}

export interface UserProps extends mongoose.Document {
    _id?: string,
    email?: string,
    email_confirmation?: boolean,
    login?: string,
    l?: number,
    password?: string,
    password_remind_hash?: string,
    sex?: boolean,
    meal_number?: number,
    users_roles_ID?: number,
    public_profile?: number,
    height?: number,
    birth?: Date,
    goal?: number,
    coach?: string,
    coach_analyze?: boolean,
    premium?: Date,
    twitter?: string,
    website?: string,
    facebook?: string,
    instagram?: string,
    name?: string,
    surname?: string,
    description?: string,
    banned?: boolean,
    avatar?: boolean,
    water_adder?: boolean,
    workout_watch?: boolean,
    kind_of_diet?: number,
    sport_active?: boolean,
    activity?: number,
    fiber?: number,
    sugar_percent?: number,
    macronutrients?: Array<MacronutrientsProps>
    createdAt?: Date,
    updatedAt?: Date,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const macronutrientsSchema = new mongoose.Schema({
    proteins: Number,
    carbs: Number,
    fats: Number,
}, { _id: false })

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    email_confirmation: {
        type: Boolean,
        default: false
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    l: Number,
    password: {
        type: String,
        required: true
    },
    password_remind_hash: String,
    sex: {
        type: Boolean,
        required: true
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
        required: true
    },
    birth: {
        type: String,
        required: true
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
    fiber: {
        type: Number,
        default: 25
    },
    sugar_percent: {
        type: Number,
        default: 10
    },
    macronutrients: [macronutrientsSchema]
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    let user: any = this

    if (user.isNew) {
        let macronutrients = []
        for (let i = 0; i < 7; i++) {
            macronutrients.push({
                proteins: 0,
                carbs: 0,
                fats: 0
            })
        }
        user.macronutrients = macronutrients
        user.l = user.login.length
    }

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTORY as string));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;

    return next();

})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user: any = this;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

export const UserModel = mongoose.model('user', userSchema);