const loadExercise = require("../functions/loadExercise")

module.exports = async function (req) {
    return new Promise(resolve => {
        const Model = require('../models/workout_plan')
        Model.find({
            "user_ID": req.body.user._id
        })
            .then(async response => {
                let dataArray = JSON.parse(JSON.stringify(response))
                if (dataArray && dataArray.length > 0) {
                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].exercises && dataArray[i].exercises.length > 0) {
                            for (let a = 0; a < dataArray[i].exercises.length; a++) {
                                dataArray[i].exercises[a] = await loadExercise(dataArray[i].exercises[a])
                            }
                        }
                    }
                }
                resolve(dataArray)
            })
            .catch(err => console.log(err))
    })
}