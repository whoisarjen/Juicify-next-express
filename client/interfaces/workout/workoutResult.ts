import ResultProps from "./result";

export default interface WorkoutResultProps {
    _id: string,
    workout_plan_ID: string,
    title: string,
    description: string,
    burned: number,
    results: Array<ResultProps>
}