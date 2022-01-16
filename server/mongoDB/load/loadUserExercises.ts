import bible from '../../bible';
import ExerciseProps from '../../interfaces/exercise';
import UserProps from '../../interfaces/user';
import exerciseModel from '../models/exercise'

export default async (user: UserProps): Promise<Array<ExerciseProps>> => {
    return new Promise((resolve, reject) => {
        exerciseModel.find({
            $and: [
                {
                    user_ID: user._id
                },
                {
                    deleted:
                    {
                        $exists: false
                    }
                }
            ]
        })
            .then((exercises: Array<ExerciseProps>) => resolve(exercises))
            .catch(() => reject(bible['ERROR']['500']))
    });
}