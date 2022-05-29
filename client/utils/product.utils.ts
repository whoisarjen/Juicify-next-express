import { ActivitySchemaProps } from "../schema/activity.schema"
import { PRODUCT_SCHEMA_PROPS } from "../schema/product.schema"

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

export const getProductInformations = (object: PRODUCT_SCHEMA_PROPS & ActivitySchemaProps) => {
    let newObject: any = {}
    Object.keys(getProductInformationsObject).forEach(x => {
        if (x != 'v') {
            if (object[x as keyof PRODUCT_SCHEMA_PROPS]) {
                newObject[getProductInformationsObject[x]] = object[x as keyof PRODUCT_SCHEMA_PROPS] + 'g'
            } else {
                newObject[getProductInformationsObject[x]] = '0g'
            }
        }
    })
    return {
        Name: object.name,
        ...(object.code && { Code: object.code }),
        ...newObject,
        Calories: Math.round((object.p || 0) * 4 + (object.c || 0) * 4 + (object.f || 0) * 9) + 'kcal'
    }
}

interface getCaloriesProps {
    p?: number,
    c?: number,
    f?: number,
    ethanol?: number,
    calories?: number,
    how_many?: number,
}

export const getCalories = (object: getCaloriesProps) => {
    if (!object) {
        return 0
    }
    if (object.calories) {
        return parseInt((object.calories).toString())
    } else {
        return parseInt(((object.p || 0) * (object.how_many || 1) * 4 + (object.c || 0) * (object.how_many || 1) * 4 + (object.f || 0) * (object.how_many || 1) * 9 + (object.ethanol || 0) * (object.how_many || 1) * 7).toString())
    }
}

export const getMacronutrient = (object: getCaloriesProps, macronutrient: string) => {
    if (macronutrient == 'p') {
        return (object.p || 0) * (object.how_many || 1)
    }
    if (macronutrient == 'c') {
        return (object.c || 0) * (object.how_many || 1)
    }
    if (macronutrient == 'f') {
        return (object.f || 0) * (object.how_many || 1)
    }

    return 0;
}