import { WorkoutPlanSchemaProps } from "../../client/schema/workoutPlan.schema"
import { getExercise } from "../mongoDB/service/exercise.service"

export const loadMissingData = async (array: Array<WorkoutPlanSchemaProps>) => {
    try {
        let response = JSON.parse(JSON.stringify(array))
        if (response?.length) {
            for (let i = 0; i < response.length; i++) {
                const exercises = []
                if (response[i].exercises?.length) {
                    for (let a = 0; a < response[i].exercises?.length; a++) {
                        exercises.push({ ...await getExercise(response[i].exercises[a]._id) })
                    }
                    response[i].exercises = exercises;
                }
            }
        }
        return response;
    } catch (error: any) {
        console.log(error)
        throw error;
    }
}