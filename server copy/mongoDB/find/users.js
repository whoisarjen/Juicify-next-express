const handleError = require("../functions/handleError")

module.exports = async function (req, res) {
    const Model = require('../models/user')

    Model.find({
        login: { '$regex': req.body.find, '$options': 'i' }
    })
        .limit(10)
        .sort({ l: 1 })
        .then(async (arrayWithUsers) => {
            const userInformationCutter = require('../functions/userInformationCutter')
            await userInformationCutter(arrayWithUsers)
                .then(items => res.send({ items }))
                .catch(err => handleError(err, 'find/users'))
        })
        .catch(err => handleError(err, 'find/users'))
}