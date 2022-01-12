import ProductProps from "../interfaces/product";

export default class Product implements ProductProps {
    constructor(
        public _id: string,
        public name: string,
        public l: number,
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
        public ethanol?: number
    ){}

    calories(){
        return (this.p || 0) * 4 + (this.c || 0) * 4 + (this.f || 0) * 9 + (this.ethanol || 0) * 7;
    }
}