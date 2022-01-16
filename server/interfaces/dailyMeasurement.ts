import NutritionDiaryProps from "./nutritionDiary";
import WorkoutResultProps from "./workoutResult";

interface DailyMeasurementProps{
    user_ID: string,
    whenAdded: Date,
    weight: number,
    neck: number,
    shoulders: number,
    chest: number,
    biceps: number,
    waist: number,
    hips: number,
    thigh: number,
    calf: number,
    water: number,
    weight_description: string,
    nutrition_diary: Array<NutritionDiaryProps>,
    workout_result: Array<WorkoutResultProps>
}

export default DailyMeasurementProps;