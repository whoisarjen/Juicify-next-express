import UserProps from "../../interfaces/user";
import cutUserSensitiveData from '../functions/cutUserSensitiveData'

export default async (login: string) => {
    return new Promise(resolve => {
        const Model = require('../models/user')
        Model.findOne({ login })
            .then(async (response: UserProps) => {
                let user = {}
                if (response) {
                    user = await cutUserSensitiveData([response])
                    user = user[0]
                }
                resolve(user)
            })
    });
}