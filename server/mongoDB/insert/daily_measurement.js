const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = async function (req) {
	return new Promise(resolve => {
		const Model = require('../models/daily_measurement')
		function check2(array, user_ID) {
			return new Promise(resolve => {
				const arrayToOverwrite = []
				const arrayToInsert = []
				const loopLength = array.length
				for (let i = 0; i < loopLength; i++) {
					Model.findOne({
						user_ID: user_ID,
						whenAdded: array[i].whenAdded
					})
						.then(function (item) {
							if (item && item._id && array[i]) {
								array[i]._id = item._id

								if (item.weight && !array[i].weight) array[i].weight = item.weight
								if (item.weight_description && !array[i].weight_description) array[i].weight_description = item.weight_description
								if (item.neck && !array[i].neck) array[i].neck = item.neck
								if (item.shoulders && !array[i].shoulders) array[i].shoulders = item.shoulders
								if (item.chest && !array[i].chest) array[i].chest = item.chest
								if (item.biceps && !array[i].biceps) array[i].biceps = item.biceps
								if (item.waist && !array[i].waist) array[i].waist = item.waist
								if (item.hips && !array[i].hips) array[i].hips = item.hips
								if (item.thigh && !array[i].thigh) array[i].thigh = item.thigh
								if (item.calf && !array[i].calf) array[i].calf = item.calf
								if (item.water && !array[i].water) array[i].water = item.water

								if (item.nutrition_diary && !array[i].nutrition_diary) array[i].nutrition_diary = item.nutrition_diary
								else if (item.nutrition_diary && array[i].nutrition_diary) array[i].nutrition_diary = array[i].nutrition_diary.concat(item.nutrition_diary)

								if (item.workout_result && !array[i].workout_result) array[i].workout_result = item.workout_result
								else if (item.workout_result && array[i].workout_result) array[i].workout_result = array[i].workout_result.concat(item.workout_result)

								arrayToOverwrite.push(array[i])
							}
						})
						.then(() => {
							const checkIfExist = arrayToOverwrite.filter((x) => x.whenAdded == array[i].whenAdded)
							if (checkIfExist.length == 0) arrayToInsert.push(array[i])
						})
						.then(() => {
							if (i + 1 == loopLength) {
								resolve({
									"arrayToOverwrite": arrayToOverwrite,
									"array": arrayToInsert
								});
							}
						})
				}
			})
		}

		function overwrite2(array, user_ID) {
			return new Promise(resolve => {
				for (let i = 0; i < array.length; i++) {
					Model.findOneAndReplace({
						"_id": array[i]._id,
						"user_ID": user_ID
					},
						array[i],
						{ returnOriginal: false }
					).then(function (item) {
						array[i] = item
					})
						.then(() => {
							if (i + 1 == array.length) {
								resolve({
									"arrayWithOverwrited": array
								});
							}
						})
				}
			})
		}

		function insert2(array, user_ID) {
			return new Promise(resolve => {
				Model.create(array).then(function (response) {
					resolve({
						"arrayWithInserted": response
					});
				})
			})
		}

		let model = []
		const check = await check2(req.body.array, req.body.user_ID)
		if (check.arrayToOverwrite && check.arrayToOverwrite.length > 0) {
			const arrayWithOverwrited = await overwrite2(check.arrayToOverwrite, req.body.user_ID)
			model = arrayWithOverwrited.arrayWithOverwrited
		}
		if (check.array && check.array.length > 0) {
			const arrayWithInserted = await insert2(check.array, req.body.user_ID)
			model = model.concat(arrayWithInserted.arrayWithInserted)
		}

		const copyModel = JSON.parse(JSON.stringify(model))
		for (let i = 0; i < copyModel.length; i++) {
			if (copyModel[i].nutrition_diary && copyModel[i].nutrition_diary.length > 0) {
				for (let a = 0; a < copyModel[i].nutrition_diary.length; a++) {
					copyModel[i].nutrition_diary[a] = await loadProduct(model[i].nutrition_diary[a])
				}
			}
			if (copyModel[i].workout_result && copyModel[i].workout_result.length > 0) {
				for (let a = 0; a < copyModel[i].workout_result.length; a++) {
					for (let b = 0; b < copyModel[i].workout_result[a].results.length; b++) {
						copyModel[i].workout_result[a].results[b] = await loadExercise(model[i].workout_result[a].results[b])
					}
				}
			}
		}
		resolve(copyModel)
	})
}