module.exports = (kind_of_diet, age, sport_active, weight, calories) => {
    switch (kind_of_diet) {
        case 0:
            return require("./macro/balanced_diet")(age, sport_active, weight, calories)
        case 1:
            return require("./macro/ketogenic_diet")(age, sport_active, weight, calories)
        default:
            console.log('Did not find option for kind of diet in macro')
            return false
    }
}