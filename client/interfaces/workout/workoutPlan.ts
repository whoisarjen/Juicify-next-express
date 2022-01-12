import ExerciseProps from "./exercise"

export default interface WorkoutPlanProps {
    _id: string,
    user_ID: string,
    title?: string,
    description?: string,
    burnt?: number,
    exercises?: Array<ExerciseProps>
}