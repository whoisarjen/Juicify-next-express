import bcrypt from 'bcrypt';
import userModel from '../models/user'
import UserProps from '../../interfaces/user';
import bible from '../../bible';

export default async (login: string, password: string): Promise<UserProps> => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            login
        })
            .then((user: UserProps) => {
                if (!user) {
                    reject(bible['ERROR']['USER DOES NOT EXISTS'])
                } else if (user.banned) {
                    reject(bible['ERROR']['BANNED'])
                } else {
                    bcrypt.compare(password, user.password, (error: any, response: any) => {
                        if (!response) {
                            reject(bible['ERROR']['WRONG PASSWORD'])
                        } else {
                            resolve(user)
                        }
                    })
                }
            })
            .catch(() => reject(bible['ERROR']['500']))
    })
}