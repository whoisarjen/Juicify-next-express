import bible from '../../bible';
import UserProps from '../../interfaces/user';
import WorkoutPlanProps from '../../interfaces/workoutPlan';
import workoutPlanModel from '../models/workout_plan';
import loadExercise from './loadExercise';

export default async (user: UserProps): Promise<Array<WorkoutPlanProps>> => {
    return new Promise((resolve, reject) => {
        workoutPlanModel.find({
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