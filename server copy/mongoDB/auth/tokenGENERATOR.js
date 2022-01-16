module.exports = function(array){
    const jwt = require("jsonwebtoken");
    const tokenKEY = require("./tokenKEY");
    return jwt.sign({
        _id: array[0]._id,
        email: array[0].email,
        email_confirmation: array[0].email_confirmation,
        login: array[0].login,
        sex: array[0].sex,
        premium: array[0].premium,
        lang: array[0].lang,
        meal_number: array[0].meal_number,
        users_roles_ID: array[0].users_roles_ID,
        public_profile: array[0].public_profile,
        height: array[0].height,
        birth: array[0].birth,
        coach: array[0].coach,
        coach_analyze: array[0].coach_analyze,
        goal: array[0].goal,
        registered: array[0].registered,
        website: array[0].website,
        instagram: array[0].instagram,
        facebook: array[0].facebook,
        twitter: array[0].twitter,
        name: array[0].name,
        surname: array[0].surname,
        description: array[0].description,
        macronutrients: array[0].macronutrients,
        banned: array[0].banned,
        avatar: array[0].avatar,
        water_adder: array[0].water_adder,
        workout_watch: array[0].workout_watch,
        kind_of_diet: array[0].kind_of_diet,
        activity: array[0].activity,
        sport_active: array[0].sport_active,
        reverse_diet: array[0].reverse_diet,
        useProteinsG: array[0].useProteinsG,
        proteinsG: array[0].proteinsG,
        proteins: array[0].proteins,
        carbs: array[0].carbs,
        fats: array[0].fats,
        fiber: array[0].fiber,
        sugar_percent: array[0].sugar_percent
    },
    tokenKEY, {
        expiresIn: '30s'
    })
}