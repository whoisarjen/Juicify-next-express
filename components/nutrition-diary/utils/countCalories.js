const countCalories = ({ p = 0, c = 0, f = 0, ethanol = 0, how_many = 1, calories = 0}) => {
    if (calories) {
        return calories
    } else {
        return parseInt((p * how_many * 4) + (c * how_many * 4) + (f * how_many * 9) + (ethanol * how_many * 7))
    }
}

export default countCalories;