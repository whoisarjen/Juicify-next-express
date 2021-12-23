module.exports = function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	// 0 - balanced diet
	// 1 - keto diet

	let object = req.body.array[0]
	let age = getAge(req.body.token.birth)
	let height = req.body.token.height

	let proteins = 0;
	let carbs = 0;
	let fats = 0;
	let calories = 0

	// Counting calories
	if(req.body.token.sex == false) calories = parseInt((( 9.99 * object.theNewestWeight + 6.25 * height - 4.92 * age - 161 ) * object.activity ) + object.goal * 7800 / 30)
	else calories = parseInt((( 9.99 * object.theNewestWeight + 6.25 * height - 4.92 * age + 5 ) * object.activity ) + object.goal * 7800 / 30)

	// Settling macro
	let macro
	if(object.kind_of_diet == 0) macro = require("./macro/balanced_diet")(age, req.body.array[0].sport_active, object.theNewestWeight, calories)
	else if(object.kind_of_diet == 0) macro = require("./macro/ketogenic_diet")(age, req.body.array[0].sport_active, object.theNewestWeight, calories)
	else macro = require("./macro/custom_macro")(age, req.body.array[0].sport_active, object.theNewestWeight, calories, object.useProteinsG, object.proteinsG, object.proteins, object.carbs, object.fats)

	proteins = macro.proteins
	carbs = macro.carbs
	fats = macro.fats

	proteins = parseInt(proteins / 4) 
	carbs = parseInt(carbs / 4) 
	fats = parseInt(fats / 9) 

	let array = []
	for(let i=0; i<7; i++){
		array.push({
			'day': i+1,
			'proteins': proteins,
			'carbs': carbs,
			'fats': fats
		})
	}

    const Model = require('../models/user')
    Model.findOneAndUpdate({
        "_id": req.body.token._id
    },
    {
    	coach: (new Date( Date.parse(req.body.array[0].today) + 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
    	coach_analyze: false,
    	reverse_diet: req.body.array[0].reverse_diet,
    	goal: req.body.array[0].goal,
    	kind_of_diet: req.body.array[0].kind_of_diet,
    	sport_active: req.body.array[0].sport_active,
    	activity: req.body.array[0].activity,
 		useProteinsG: req.body.array[0].useProteinsG,
 		proteinsG: req.body.array[0].proteinsG,
 		proteins: req.body.array[0].proteins,
 		carbs: req.body.array[0].carbs,
 		fats: req.body.array[0].fats,
    	macronutrients: array 
    },
    {
    	new: true
    }).then((response) => {
        return require('../auth/tokenGENERATOR')([response])
    }).then((jwt) => {
		res.send({
			jwt: jwt,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)


}

function getAge(date){
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}