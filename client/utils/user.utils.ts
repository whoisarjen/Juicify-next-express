export const getMacroByDay = (date: any, token: any = false) => {
    let day = (new Date(date)).getDay() // 0 in array => Sunday | day 1

    if (token && token.macronutrients) {
        return token.macronutrients[day]
    } else {
        return {
            day: day + 1, // DB add +1, so fake has to do same
            proteins: 0,
            carbs: 0,
            fats: 0
        }
    }
}