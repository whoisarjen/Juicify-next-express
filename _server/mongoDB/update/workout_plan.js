module.exports = function (req) {
    return new Promise(resolve => {

        let arrayNEWvalues = []
        const Model = require('../models/workout_plan')
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
                    model.exercises = JSON.parse(JSON.stringify(req.body.array[i].exercises))
                    arrayNEWvalues.push(model)
                })
                .catch(err => console.log(err))
                .finally(() => {
                    if (i + 1 == req.body.array.length) {
                        resolve(arrayNEWvalues)
                    }
                })
        }

    })

}