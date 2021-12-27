module.exports = async function (req) {
    return new Promise(async resolve => {
        const Model = require('../models/user')
        const array = await require('./updateUserProtection')(req.body.array)
    
        Model.findOneAndUpdate({
            _id: req.body.user_ID
        },
            { $set: array[0] },
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
}