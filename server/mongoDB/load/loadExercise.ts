import bible from '../../bible';
import ResultProps from '../../interfaces/result';
import { ExerciseModel, ExerciseProps } from '../models/exercise.model';

let cache: any = {}

export default async (object: ExerciseProps | ResultProps): Promise<ExerciseProps> => {
    return new Promise((resolve, reject) => {
        if (cache[object._id]) {
            resolve(cache[object._id]);
        } else {
            ExerciseModel.findOne({ _id: object._id })
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