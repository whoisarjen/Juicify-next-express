import NutritionDiaryProps from "../interfaces/nutritionDiary"

export const getCalories = (object: NutritionDiaryProps) => {
    if (object.calories) {
        return parseInt((object.calories).toString())
    } else {
        return parseInt(((object.p || 0) * (object.how_many || 1) * 4 + (object.c || 0) * (object.how_many || 1) * 4 + (object.f || 0) * (object.how_many || 1) * 9 + (object.ethanol || 0) * (object.how_many || 1) * 7).toString())
    }
}