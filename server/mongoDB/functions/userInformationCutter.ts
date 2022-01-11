const userInformationCutter = async (user: any) => {
    return new Promise(resolve => {
        let array = []
        for(let i=0; i<user.length; i++){
            let object = JSON.parse(JSON.stringify(user[i]));

            delete object.email_confirmation
            delete object.meal_number
            // delete object.users_roles_ID
            // delete object.public_profile
            delete object.goal
            delete object.coach
            delete object.registered
            // delete object.banned
            // delete object.avatar
            delete object.fiber
            delete object.sugar_percent
            delete object.water_adder
            delete object.workout_watch
            // delete object._id
            // delete object.login
            delete object.password
            delete object.email
            delete object.height
            delete object.birth
            // delete object.sex
            delete object.language
            delete object.macronutrients
            // delete object.instagram
            // delete object.twitter
            // delete object.facebook
            // delete object.website
            // delete object.description
            // delete object.name
            // delete object.surname

            array.push(object)
        }
        resolve(array)
    });
}

export default userInformationCutter;