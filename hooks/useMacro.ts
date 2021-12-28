const useMacro = () => {

    const getDay = (date: any, token: any = false) => {
        let day = (new Date(date)).getDay() // 0 => Sunday

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

    return [getDay]
}

export default useMacro;