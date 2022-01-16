import MacronutrientsProps from "./macronutrients";

interface UserProps {
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
}

export default UserProps;