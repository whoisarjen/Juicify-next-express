const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = async function (req) {
    return new Promise(resolve => {

        let arrayNEWvalues = []
        const Model = require('../models/daily_measurement')
        for (let i = 0; i < req.body.array.length; i++) {
            Model.findOneAndReplace({
                "_id": req.body.array[i]._id,
                "user_ID": req.body.array[i].user_ID
            },
                req.body.array[i],
                { returnOriginal: false }
            )
                .then(async (model) => {
                    let copyModel = JSON.parse(JSON.stringify(model))
                    if (copyModel.nutrition_diary && copyModel.nutrition_diary.length > 0) {
                        for (let a = 0; a < copyModel.nutrition_diary.length; a++) {
                            copyModel.nutrition_diary[a] = await loadProduct(model.nutrition_diary[a])
                        }
                    }
                    if (copyModel.workout_result && copyModel.workout_result.length > 0) {
                        for (let a = 0; a < copyModel.workout_result.length; a++) {
                            for (let b = 0; b < copyModel.workout_result[a].results.length; b++) {
                                copyModel.workout_result[a].results[b] = await loadExercise(model.workout_result[a].results[b])
                            }
                        }
                    }
                    arrayNEWvalues.push(copyModel)
                })
                .catch(err => console.log(err))
                .finally(() => {
                    if (i + 1 == req.body.array.length) {
                        resolve(arrayNEWvalues)
                    }
                })
        }

    });
}