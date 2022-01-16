import bible from '../../bible';
import NutritionDiaryProps from '../../interfaces/nutritionDiary';
import ProductProps from '../../interfaces/product';
import productModel from '../models/product'

let cache: any = {}

export default async (object: NutritionDiaryProps) => {
    return new Promise((resolve, reject) => {
        if (cache[object.product_ID]) {
            resolve(Object.assign(JSON.parse(JSON.stringify(cache[object.product_ID])), JSON.parse(JSON.stringify(object))));
        } else {
            productModel.findOne({ _id: object.product_ID })
                .then((product: ProductProps) => {
                    if (product) {
                        cache[object.product_ID] = JSON.parse(JSON.stringify(product))
                    }
                    resolve(Object.assign(JSON.parse(JSON.stringify(product)), JSON.parse(JSON.stringify(object))))
                })
                .catch(() => reject(bible['ERROR']['500']))
        }
    });
}