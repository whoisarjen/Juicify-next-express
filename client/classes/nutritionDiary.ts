import NutritionDiaryProps from "../interfaces/nutritionDiary";

export default class NutritionDiary implements NutritionDiaryProps {
    constructor(
        public _id: string,
        public meal?: number,
        public product_ID?: string,
        public how_many?: number,
        public name?: string,
        public l?: number,
        public v?: boolean,
        public deleted?: boolean,
        public user_ID?: string,
        public checkMe?: boolean,
        public code?: number,
        public p?: number,
        public c?: number,
        public s?: number,
        public f?: number,
        public fi?: number,
        public na?: number,
        public ethanol?: number,
        public activity?: string,
        public calories?: number,
    ) { }

    getCalories() {
        if (this.calories) {
            return parseInt((this.calories).toString())
        } else {
            return parseInt(((this.p || 0) * (this.how_many || 1) * 4 + (this.c || 0) * (this.how_many || 1) * 4 + (this.f || 0) * (this.how_many || 1) * 9 + (this.ethanol || 0) * (this.how_many || 1) * 7).toString())
        }
    }
}