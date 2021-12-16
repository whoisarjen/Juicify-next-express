const handleError = require("../functions/handleError")
const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = async function (req, res) {
    const Model = require('../models/daily_measurement')
    Model.find({
        user_ID: req.body.user_ID,
        whenAdded: {
            $gte: req.body.overDatePlusTheDate
        }
    })
        .then(async function (response) {
            if (!response) return res.status(404).send({ error: 'Not found' })
            let dataArray = JSON.parse(JSON.stringify(response))
            if(dataArray.length > 0){
                for(let z=0; z<dataArray.length; z++){
                    if (dataArray[z] && dataArray[z].nutrition_diary && dataArray[z].nutrition_diary.length > 0) {
                        for (let i = 0; i < dataArray[z].nutrition_diary.length; i++) {
                            dataArray[z].nutrition_diary[i] = await loadProduct(response[z].nutrition_diary[i])
                        }
                    }
                    if (dataArray[z].workout_result && dataArray[z].workout_result.length > 0) {
                        for (let a = 0; a < dataArray[z].workout_result.length; a++) {
                            for (let b = 0; b < dataArray[z].workout_result[a].results.length; b++) {
                                dataArray[z].workout_result[a].results[b] = await loadExercise(response[z].workout_result[a].results[b])
                            }
                        }
                    }
                }
            }
            res.send({
                user: req.body.user,
                dataArray
            })
        }).catch(err => handleError(err, '/guest/daily_measurements'))
}