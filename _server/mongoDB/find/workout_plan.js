const loadExercise = require("../functions/loadExercise")

module.exports = async function (req) {
    return new Promise(resolve => {
        const Model = require('../models/workout_plan')
        Model.findOne({
            "_id": req.body.uniqueKey,
            "user_ID": req.body.user._id
        })
            .then(async response => {
                let dataObject = JSON.parse(JSON.stringify(response))
                if (dataObject && dataObject.exercises && dataObject.exercises.length > 0) {
                    for (let a = 0; a < dataObject.exercises.length; a++) {
                        dataObject.exercises[a] = await loadExercise(dataObject.exercises[a])
                    }
                }
                resolve(dataObject)
            })
            .catch(err => console.log(err))
    })
}