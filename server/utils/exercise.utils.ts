import { WorkoutPlanSchemaProps } from "../../client/schema/workoutPlan.schema"
import { getExercise } from "../mongoDB/service/exercise.service"

export const loadWorkoutPlansMissingData = async (workoutPlans: WorkoutPlanSchemaProps) => {
    const exercises = []
    if (workoutPlans && workoutPlans.exercises && workoutPlans.exercises.length) {
        for (let a = 0; a < workoutPlans.exercises.length; a++) {
            exercises.push({ ...await getExercise(workoutPlans.exercises[a]._id) })
        }
    }
    return { ...JSON.parse(JSON.stringify(workoutPlans)), exercises }
}