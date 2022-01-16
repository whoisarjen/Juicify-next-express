module.exports = function(age, isLifting, weight, calories){
	let object = {}

	object.carbs = calories * 0.05

	// Atl 40g carbs
	if(object.carbs < 160) object.carbs = 160

	if(isLifting){
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

	object.fats = calories - object.carbs - object.proteins

	if(object.fats < calories * 0.7){
		if(age < 18){
			object.proteins = 0.8 * weight * 4
		}else if(age < 40){
			object.proteins = 1.1 * weight * 4
		}else if(age < 65){
			object.proteins = 1.3 * weight * 4
		}else{
			object.proteins = 1.5 * weight * 4
		}
		object.fats = calories - object.carbs - object.proteins
	}
	
	object.proteins = parseInt(object.proteins / 4)
	object.carbs = parseInt(object.carbs / 4)
	object.fats = parseInt(object.fats / 9)

	return object
}