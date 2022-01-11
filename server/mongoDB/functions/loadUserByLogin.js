const userInformationCutter = require('./userInformationCutter')

module.exports = async (login) => {
    return new Promise(resolve => {
        const Model = require('../models/user')
        Model.findOne({ login: login })
            .then(async (response) => {
                let user = {}
                if (response) {
                    user = await userInformationCutter([response])
                    user = user[0]
                }
                resolve(user)
            })
    });
}