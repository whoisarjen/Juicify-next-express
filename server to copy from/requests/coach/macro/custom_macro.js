module.exports = function(age, sport_active, weight, calories, useProteinsG, proteinsG, proteins, carbs, fats){
	proteinsG = proteinsG / 100
	proteins = proteins / 100
	carbs = carbs / 100
	fats = fats / 100
	let object = {}

	object.fats = calories * fats
	calories -= object.fats

	if(useProteinsG){
		if(calories > weight * proteinsG * 4){
			object.proteins = weight * proteinsG * 4
			calories -= object.proteins
			object.carbs = calories
		}else{
			object.proteins = calories
			object.carbs = 0
		}
	}else{
		object.proteins = calories * proteins
		object.carbs = calories * carbs
	}

	return object
}