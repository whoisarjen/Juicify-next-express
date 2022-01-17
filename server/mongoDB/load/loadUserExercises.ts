import bible from '../../bible';
import { ExerciseProps, ExerciseModel } from '../models/exercise.model';
import { UserProps } from '../models/user.model';

export default async (user: UserProps): Promise<Array<ExerciseProps>> => {
    return new Promise((resolve, reject) => {
        ExerciseModel.find({
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