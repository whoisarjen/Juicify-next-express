module.exports = async function (req) {
    return new Promise(resolve => {

        const Model = require('../models/workout_plan')
        Model.create(req.body.array).then(function (model) {
            let array = JSON.parse(JSON.stringify(model))
            for (let i = 0; i < req.body.array.length; i++) {
                array[i].exercises = JSON.parse(JSON.stringify(req.body.array[i].exercises))
            }
            resolve(array)
        })
            .catch(err => console.log(err))
    })

}