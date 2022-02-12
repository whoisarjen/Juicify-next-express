import { WorkoutResultSchemaProps } from "../schema/workoutResult.schema";
import NutritionDiaryProps from "./nutritionDiary.interface";

export default interface DailyMeasurementProps {
    _id: string,
    user_ID: string,
    whenAdded: Date,
    nutrition_diary?: Array<NutritionDiaryProps>,
    workout_result?: Array<WorkoutResultSchemaProps>,
    weight?: number,
}