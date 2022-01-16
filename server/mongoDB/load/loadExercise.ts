import bible from '../../bible';
import ExerciseProps from '../../interfaces/exercise';
import exerciseModel from '../models/exercise';

let cache: any = {}

export default async (object: ExerciseProps): Promise<ExerciseProps> => {
    return new Promise((resolve, reject) => {
        if (cache[object._id]) {
            resolve(cache[object._id]);
        } else {
            exerciseModel.findOne({ _id: object._id })
                .then((exercise: ExerciseProps) => {
                    if (exercise) {
                        cache[object._id] = JSON.parse(JSON.stringify(exercise))
                    }
                    resolve(exercise)
                })
                .catch(() => reject(bible['ERROR']['500']))
        }
    });
}