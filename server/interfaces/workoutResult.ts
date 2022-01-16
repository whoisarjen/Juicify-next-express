import ResultProps from "./result";

interface WorkoutResultProps{
    workout_plan_ID: string,
    title: string,
    description: string,
    results: Array<ResultProps>
}

export default WorkoutResultProps;