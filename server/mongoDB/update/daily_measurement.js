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
                .then(function (model) {
                    model = JSON.parse(JSON.stringify(model))
                    if (model.workout_result && model.workout_result.length > 0) {
                        for (let i = 0; i < model.workout_result.length; i++) {
                            model.workout_result[i].results = JSON.parse(JSON.stringify(req.body.array[i].workout_result[i].results))
                        }
                    }
                    arrayNEWvalues.push(model)
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