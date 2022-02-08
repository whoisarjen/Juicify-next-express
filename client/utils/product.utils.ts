import NutritionDiaryProps from "../interfaces/nutritionDiary.interface"

const getProductInformationsObject: any = {
    'p': 'Proteins',
    'c': 'Carbs',
    's': 'Sugar',
    'f': 'Fats',
    'fi': 'Fiber',
    'na': 'Salt',
    'ethanol': 'Ethanol',
    'calories': 'Calories',
    'v': 'Verified'
}

export const getProductInformations = (object: NutritionDiaryProps) => {
    let newObject: any = {}
    Object.keys(getProductInformationsObject).forEach(x => {
        if (object[x as keyof NutritionDiaryProps]) {
            newObject[getProductInformationsObject[x]] = object[x as keyof NutritionDiaryProps]
        } else {
            newObject[getProductInformationsObject[x]] = 0
        }
    })
    return {
        Name: object.name,
        ...(object.code && { Code: object.code }),
        ...newObject,
    }
}

export const getCalories = async (object: NutritionDiaryProps) => {
    if (!object) {
        return 0
    }
    if (object.calories) {
        return parseInt((object.calories || 0).toString())
    } else {
        return parseInt(((object.p || 0) * (object.how_many || 1) * 4 + (object.c || 0) * (object.how_many || 1) * 4 + (object.f || 0) * (object.how_many || 1) * 9 + (object.ethanol || 0) * (object.how_many || 1) * 7).toString())
    }
}