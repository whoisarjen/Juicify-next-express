import ResultProps from "../../interfaces/workout/result";
import WorkoutResultProps from "../../interfaces/workout/workoutResult";

export default class WorkoutResult implements WorkoutResultProps{
    constructor(
        public _id: string,
        public workout_plan_ID: string,
        public title: string,
        public description: string,
        public results: Array<ResultProps>
    ){}
}