"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const macronutrientsSchema = new mongoose_1.default.Schema({
    proteins: Number,
    carbs: Number,
    fats: Number,
}, { _id: false });
const userSchema = new mongoose_1.default.Schema({
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
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (user.isNew) {
            let macronutrients = [];
            for (let i = 0; i < 7; i++) {
                macronutrients.push({
                    proteins: 0,
                    carbs: 0,
                    fats: 0
                });
            }
            user.macronutrients = macronutrients;
            user.l = user.login.length;
        }
        if (!user.isModified('password')) {
            return next();
        }
        const salt = yield bcrypt_1.default.genSalt(config_1.default.get('SALT_WORK_FACTORY'));
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
        return next();
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(candidatePassword, user.password).catch(e => false);
    });
};
exports.UserModel = mongoose_1.default.model('user', userSchema);
