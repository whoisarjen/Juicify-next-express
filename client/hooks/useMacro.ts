const useMacro = () => {

    const getShortDayName = (day: number) => {
        return {
            1: 'short_sunday',
            2: 'short_monday',
            3: 'short_tuesday',
            4: 'short_wednesday',
            5: 'short_thursday',
            6: 'short_friday',
            7: 'short_saturday'
        }[day] || 'short_sunday'
    }

    const getDay = (date: any, token: any = false) => {
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

    return [{ getDay, getShortDayName }]
}

export default useMacro;