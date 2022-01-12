import ExerciseProps from "./exercise"

export default interface WorkoutPlanProps {
    _id: string,
    title: string,
    description?: string,
    user_ID: string,
    burnt?: number,
    exercises: Array<ExerciseProps>
}