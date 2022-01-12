import ResultProps from "../../interfaces/workout/result";
import WorkoutResultProps from "../../interfaces/workout/workoutResult";

export default class WorkoutResult implements WorkoutResultProps {
    _id: string = 'XD' + Math.random();
    workout_plan_ID: string = '';
    title: string = '';
    description: string = '';
    burned: number = 0;
    results: ResultProps[] = [];

    constructor(value: WorkoutResultProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }
}