import bcrypt from 'bcrypt';
import { UserProps, UserModel } from '../models/user.model'
import bible from '../../bible';

export default async (login: string, password: string): Promise<UserProps> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({
            login
        })
            .then((user: UserProps) => {
                if (!user) {
                    reject(bible['ERROR']['USER DOES NOT EXISTS'])
                } else if (user.banned) {
                    reject(bible['ERROR']['BANNED'])
                } else {
                    // bcrypt.compare(password, user.password, (error: any, response: any) => {
                        // if (!response) {
                            // reject(bible['ERROR']['WRONG PASSWORD'])
                        // } else {
                            resolve(user)
                        // }
                    // })
                }
            })
            .catch(() => reject(bible['ERROR']['500']))
    })
}