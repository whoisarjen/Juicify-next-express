module.exports = function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	// 0 - balanced diet
	// 1 - keto diet
	// 2 - custome

	let coachAnswer = ''

	let object = req.body.array[0]
	if(!object.theNewestWeight) object.theNewestWeight = 50 // Protect if not the newest weight
	let age = getAge(req.body.token.birth)
	let height = req.body.token.height

	let proteins = 0;
	let carbs = 0;
	let fats = 0;
	let calories = 0

	let consumedFiber = 0
	let consumedSugar = 0
	let consumedProteins = 0

    let averageCHANGEinWEIGHT = 0
    let allWEEKLYcalories = 0

    let averateWeightWeek2 = 0
    let averateCaloriesWeek2 = 0

    // Using for everyday weight from next day
    for(let i=object.results.length - 1; i>=0; i--){
    	if(i == 0){
    		object.results[i].weight = object.theNewestWeight
    		break;
    	}
    	object.results[i].weight = object.results[i - 1].weight
    }

	for(let i=0;i<7;i++){
    	averateWeightWeek2 += object.results[i].weight
    	averateCaloriesWeek2 += object.results[i].calories

    	consumedFiber += object.results[i].fiber
		consumedSugar += object.results[i].sugar
		consumedProteins += object.results[i].proteins
		allWEEKLYcalories += object.results[i].calories
	}
	averateWeightWeek2 = averateWeightWeek2 / 7
	averateCaloriesWeek2 = averateCaloriesWeek2 / 7

    let averateWeightWeek1 = 0
	for(let i=7;i<14;i++){
    	averateWeightWeek1 += object.results[i].weight
	}
	averateWeightWeek1 = averateWeightWeek1 / 7

	// Second + analyze has to own atleast 75% success ratio
	if(object.checkIfEverythingIsFine && req.body.token.coach_analyze){
		let prevGoalCalories = req.body.token.macronutrients[0].proteins * 4 + req.body.token.macronutrients[0].carbs * 4 + req.body.token.macronutrients[0].fats * 9;
		if(prevGoalCalories * 1.1 > averateCaloriesWeek2 && prevGoalCalories * 0.9 < averateCaloriesWeek2){
			if( Math.abs(averateWeightWeek2 - averateWeightWeek1) < Math.abs(req.body.token.goal * (7.5 / 10) / 30 * 7) && req.body.token.goal != 0 ){
				res.send({
					analyzeSomethingWentWrong: true,
			        tokenGenerated: tokenGenerated,
			        tokenRefreshGenerated: tokenRefreshGenerated
				})
			}
		}
	}

	let differenceInWeight = averateWeightWeek2 - averateWeightWeek1
	let weightChangeInCalories = differenceInWeight * 7800 / 7
	let basicNeededCalories = averateCaloriesWeek2 - weightChangeInCalories

    basicNeededCalories = parseInt(basicNeededCalories / req.body.token.activity * object.activity) // Change level of activity

    calories = parseInt(basicNeededCalories + object.goal * 7800 / 30)

    // Hold macro => overwrite calories with previously
    if(object.holdMacronutrients){
    	calories = req.body.token.macronutrients[0].proteins * 4 + req.body.token.macronutrients[0].carbs * 4 + req.body.token.macronutrients[0].fats * 9
	}

	// Diet break => calores = basicNeededCalories
	if(object.dietBreak){
		calories = parseInt(req.body.token.macronutrients[0].proteins * 4 + req.body.token.macronutrients[0].carbs * 4 + req.body.token.macronutrients[0].fats * 9 + (req.body.token.goal * -7800 / 30))
	}

	// Reverse diet => calores = basicNeededCalories + 25kcal
	if(object.reverse_diet){
		calories = parseInt(req.body.token.macronutrients[0].proteins * 4 + req.body.token.macronutrients[0].carbs * 4 + req.body.token.macronutrients[0].fats * 9 + (req.body.token.goal * -7800 / 30) + 25)
	}

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

	let lastAverageCaloriesGoal = 0
	for(let i = 0; i<req.body.token.macronutrients.length; i++){
		lastAverageCaloriesGoal += req.body.token.macronutrients[i].proteins * 4 + req.body.token.macronutrients[i].carbs * 4 + req.body.token.macronutrients[i].fats * 9
	}
	lastAverageCaloriesGoal = lastAverageCaloriesGoal / 7

	if(!object.reverse_diet && !object.dietBreak) coachAnswer = coachAnswerFunction(req.body.token.lang, object.theNewestWeight, req.body.token.goal, averageCHANGEinWEIGHT, consumedFiber, consumedSugar, allWEEKLYcalories, req.body.token.fiber, req.body.token.sugar_percent, consumedProteins, req.body.token.sport_active, averateWeightWeek2, lastAverageCaloriesGoal)

    const Model = require('../models/user')
    Model.findOneAndUpdate({
        "_id": req.body.token._id
    },
    {
    	coach: (new Date( Date.parse(req.body.array[0].today) + 7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
    	coach_analyze: true,
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
			coachAnswer: coachAnswer,
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

function coachAnswerFunction(lang, theNewestWeight, prevGoal, changeInWeight, consumedFiber, consumedSugar, consumedCalories, neededFiber, neededSugar, consumedProteins, sport_active, averageConsumedCalories, lastAverageCaloriesGoal){
	let coachAnswer = ''

	let object = {
		calories: {
			pl: {
				good: 'Świetnie liczyłeś kalorie! ',
				bad: 'Musisz popracować nad trzymaniem odpowiednich kalorii. '
			},
			en: {
				good: 'Awesome job with counting calories! ',
				bad: 'You need to pay more attenction to calories. '
			}
		},
		progress: {
			pl: {
				good: 'Osiągnąłeś odpowiedni progres. Wprowadzimy kilka kosmetycznych zmian w kaloriach. ',
				bad: 'Musimy zmienić twoje kalorie. Progres jeszcze nie idzie tak, jak byśmy tego oczekiwali. '
			},
			en: {
				good: "You made progress in the way we expected. We have to cosmetical change your calories. ",
				bad: "We have to change your calories. The progress is not going as we want. "
			}
		},
		proteins: {
			pl: {
				good: "",
				bad: ""
			},
			en: {
				good: "Trenujesz, więc potrzebujesz więcej białka. Spróbuj osiągać cel. ",
				bad: "You are training, you need to eat more proteins. Try to reach goal. "
			}
		},
		fiber: {
			pl: {
				good: "",
				bad: "Spróbuj jeść więcej produktów zawierających błonnik. "
			},
			en: {
				good: "",
				bad: "Try to eat products, which have more fiber. "
			}
		},
		sugar: {
			pl: {
				good: "",
				bad: "Spróbuj jeść mniej produktów zawierających cukier. "
			},
			en: {
				good: "",
				bad: "Try to eat LESS products, which have sugar. "
			}
		},
		warning_fiber_sugar: {
			pl: 'To nie będzie miało wpływu na progres, ale może mieć wpływ na zdrowie. ',
			en: "It won't impact your progress, but might impact health. "
		},
		end: {
			pl: "Pracuj dalej i nie zapomnij odwiedzić mnie za 7+ dni!",
			en: "Keep going and let's see each other in next 7+ days!"
		}
	}

	// ----- ----- CHECK GOAL ----- -----

	if(lastAverageCaloriesGoal * 1.1 > averageConsumedCalories || lastAverageCaloriesGoal * 0.9 < averageConsumedCalories){
		coachAnswer += object['calories'][lang]['good'] || object['calories']['en']['good']
	}else{
		coachAnswer += object['calories'][lang]['bad'] || object['calories']['en']['bad']
	}

	if(prevGoal < 0 && changeInWeight < 0){
		if(Math.abs(prevGoal) > (Math.abs(changeInWeight) * 0.8) || Math.abs(prevGoal) < (Math.abs(changeInWeight) * 1.2)){
			coachAnswer += object['progress'][lang]['good'] || object['progress']['en']['good']
		}else{
			coachAnswer += object['progress'][lang]['bad'] || object['progress']['en']['bad']
		}
	}

	if(prevGoal < 0 && changeInWeight >= 0){
		coachAnswer += object['progress'][lang]['bad'] || object['progress']['en']['bad']
	}

	if(prevGoal >= 0 && changeInWeight < 0){
		coachAnswer += object['progress'][lang]['bad'] || object['progress']['en']['bad']
	}

	if(prevGoal >= 0 && changeInWeight >= 0){
		if(Math.abs(prevGoal) > (Math.abs(changeInWeight) * 0.8) || Math.abs(prevGoal) < (Math.abs(changeInWeight) * 1.2)){
			coachAnswer += object['progress'][lang]['good'] || object['progress']['en']['good']
		}else{
			coachAnswer += object['progress'][lang]['bad'] || object['progress']['en']['bad']
		}
	}

	if(sport_active && ((consumedProteins * 7 / 4 * 0.8) < (theNewestWeight * 2))){
			coachAnswer += object['proteins'][lang]['bad'] || object['proteins']['en']['bad']
	}

	let warning_fiber_sugar = false

	// ----- ----- CHECK FIBER ----- -----

	if((neededFiber / 1000 * lastAverageCaloriesGoal) * 7 * 0.8 < consumedFiber){
		coachAnswer += object['fiber'][lang]['good'] || object['fiber']['en']['good']
	}else{
		coachAnswer += object['fiber'][lang]['bad'] || object['fiber']['en']['bad']
		warning_fiber_sugar = true
	}

	// ----- ----- CHECK SUGAR ----- -----

	if((neededSugar + 2) / 100 * consumedCalories < consumedSugar){
		coachAnswer += object['sugar'][lang]['bad'] || object['sugar']['en']['bad']
		warning_fiber_sugar = true
	}else{
		coachAnswer += object['sugar'][lang]['good'] || object['sugar']['en']['good']
	}

	if(warning_fiber_sugar) coachAnswer += object['warning_fiber_sugar'][lang] || object['warning_fiber_sugar']['en']


	coachAnswer += object['end'][lang] || object['end']['en']


	return coachAnswer
}