import ExerciseProps from "./exercise";

interface WorkoutPlanProps{
    title: string,
    description: string,
    user_ID: string,
    burnt: number,
    exercises: Array<ExerciseProps>
}

export default WorkoutPlanProps;