module.exports = function(age, sport_active, weight, calories){
	let object = {}

	object.fats = calories * 0.25

	if(sport_active){
		object.proteins = 1.6 * weight * 4
	}else{
		if(age < 18){
			object.proteins = 0.8 * weight * 4
		}else if(age < 40){
			object.proteins = 1.1 * weight * 4
		}else if(age < 65){
			object.proteins = 1.3 * weight * 4
		}else{
			object.proteins = 1.5 * weight * 4
		}
	}

	object.carbs = calories - object.fats - object.proteins

	if(object.carbs < 160){
		object.proteins += object.carbs - 160
		object.carbs = 160
	}

	return object
}