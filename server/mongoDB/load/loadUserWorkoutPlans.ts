import bible from '../../bible';
import { UserProps } from '../models/user.model';
import { WorkoutPlanProps, WorkoutPlanModel } from '../models/workoutPlan.model';
import loadExercise from './loadExercise';

export default async (user: UserProps): Promise<Array<WorkoutPlanProps>> => {
    return new Promise((resolve, reject) => {
        WorkoutPlanModel.find({
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
            .then(async (workoutPlans: Array<WorkoutPlanProps>) => {
                let response: Array<WorkoutPlanProps> = JSON.parse(JSON.stringify(workoutPlans))
                for (let i = 0; i < workoutPlans.length; i++) {
                    for (let a = 0; a < workoutPlans[i].exercises.length; a++) {
                        response[i].exercises[a] = await loadExercise(workoutPlans[i].exercises[a])
                    }
                }
                resolve(response)
            })
            .catch(() => reject(bible['ERROR']['500']))
    });
}