module.exports = async function (req, res) {
    return new Promise(async resolve => {
        const Model = require('../models/user')
        Model.findOne({
            _id: req.body.user_ID
        }).then(function (user) {
            if (!user) return res.status(404).send({ error: 'Wrong password' })
            const bcrypt = require('bcrypt');
            bcrypt.compare(req.body.array[0].current, user.password, function (error, response) {
                if (!response) return res.status(404).send({ error: 'Wrong password' })
                bcrypt.hash(req.body.array[0].password, 10, function (err, hash) {
                    Model.findOneAndUpdate({
                        _id: req.body.user_ID
                    },
                        {
                            $set: {
                                password: hash
                            }
                        },
                        { new: true }
                    ).then((response) => {
                        if (response) {
                            response = JSON.parse(JSON.stringify(response))
                            const token = require('./tokenGENERATOR')([response])
                            const refresh_token = require('./tokenRefreshGENERATOR')([response])
                            resolve({
                                token,
                                refresh_token
                            })
                        } else {
                            resolve({})
                        }
                    })
                        .catch(err => console.log(err))
                })
            })
        })
            .catch(err => console.log(err))
    })
}