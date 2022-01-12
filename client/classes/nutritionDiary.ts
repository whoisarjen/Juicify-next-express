import NutritionDiaryProps from "../interfaces/nutritionDiary";

export default class NutritionDiary implements NutritionDiaryProps {
    _id: string = 'XD' + Math.random();
    meal?: number;
    product_ID?: string;
    how_many?: number;
    name?: string;
    l?: number;
    v?: boolean;
    deleted?: boolean;
    user_ID?: string;
    checkMe?: boolean;
    code?: number;
    p?: number;
    c?: number;
    s?: number;
    f?: number;
    fi?: number;
    na?: number;
    ethanol?: number;
    activity?: string;
    calories?: number;

    constructor(value: NutritionDiaryProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }

    getCalories() {
        if (this.calories) {
            return parseInt((this.calories).toString())
        } else {
            return parseInt(((this.p || 0) * (this.how_many || 1) * 4 + (this.c || 0) * (this.how_many || 1) * 4 + (this.f || 0) * (this.how_many || 1) * 9 + (this.ethanol || 0) * (this.how_many || 1) * 7).toString())
        }
    }
}