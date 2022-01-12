import DailyMeasurementProps from "../interfaces/dailyMeasurement";
import WorkoutResultProps from "../interfaces/workout/workoutResult";

export default class DailyMeasurement implements DailyMeasurementProps {
    constructor(
        public _id: string,
        public whenAdded: Date,
        public user_ID: string,
        public nutrition_diary: Array<DailyMeasurementProps> = [],
        public workout_result: Array<WorkoutResultProps> = [],
        public weight: number = 0,
        public weight_description?: string,
        public neck?: number,
        public shoulders?: number,
        public chest?: number,
        public biceps?: number,
        public waist?: number,
        public hips?: number,
        public thigh?: number,
        public calf?: number,
        public water?: number
    ) { }
}