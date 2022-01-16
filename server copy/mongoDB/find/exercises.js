const handleError = require("../functions/handleError")

module.exports = async function (req, res) {
    const Model = require('../models/exercise')
    let regex = { name: { $regex: req.body.find, $options: 'im' } }
    if (req.body.find.split(" ").length > 1) regex = { $text: { $search: req.body.find.split(" ").map(str => "\"" + str + "\"").join(' ') } }
    Model.find({
        $and: 
        [
            { user_ID: { $exists: false } },
            { deleted: { $exists: false } },
            regex
        ]
    })
        .sort({ l: 1, v: -1 })
        .limit(10)
        .then(items => res.send({ items }))
        .catch(err => handleError(err, 'find/exercises'))
}