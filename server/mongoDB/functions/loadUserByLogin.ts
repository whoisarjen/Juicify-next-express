const userInformationCutter = require('./userInformationCutter')

const loadUserByLogin = async (login: string) => {
    return new Promise(resolve => {
        const Model = require('../models/user')
        Model.findOne({ login: login })
            .then(async (response: any) => {
                let user: any = {}
                if (response) {
                    user = await userInformationCutter([response])
                    user = user[0]
                }
                resolve(user)
            })
    });
}