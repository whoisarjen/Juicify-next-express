import ExerciseProps from "./exercise.interface"

export default interface WorkoutPlanProps {
    _id: string,
    user_ID: string,
    title?: string,
    description?: string,
    burnt?: number,
    exercises?: ExerciseProps[]
}