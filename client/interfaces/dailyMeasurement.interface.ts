import NutritionDiaryProps from "./nutritionDiary.interface";
import WorkoutResultProps from "./workout/workoutResult.interface";

export default interface DailyMeasurementProps {
    _id: string,
    user_ID: string,
    whenAdded: Date,
    nutrition_diary?: Array<NutritionDiaryProps>,
    workout_result?: Array<WorkoutResultProps>,
    weight?: number,
}