import DailyMeasurementProps from "../interfaces/dailyMeasurement";
import nutritionDiary from "../interfaces/nutritionDiary";
import WorkoutResultProps from "../interfaces/workout/workoutResult";

export default class DailyMeasurement implements DailyMeasurementProps {
    _id: string = 'XD' + Math.random();
    user_ID: string = '';
    whenAdded: Date = new Date();
    nutrition_diary?: nutritionDiary[] = [];
    workout_result?: WorkoutResultProps[] = [];
    weight?: number = 0;

    constructor(value: DailyMeasurementProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }
}