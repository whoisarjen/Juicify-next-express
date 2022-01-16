import handleError from '../functions/handleError';
import productModel from '../models/product'

// const cache = {}

export default async (user: any) => {
    return new Promise(resolve => {
        // const objectConstructor = ({}).constructor;
        // let res = {}
        // if (object.constructor === objectConstructor) res = JSON.parse(JSON.stringify(object))
        // else res = JSON.parse(JSON.stringify(object.toJSON()))
        // if (cache[object.product_ID]) return resolve(Object.assign(res, cache[object.product_ID]));
        productModel.findMany({ user_ID: user._id })
            .then((products: any) => {
                // let createdObject = {}
                // if (product) {
                //     product = product.toJSON()
                //     createdObject = product
                //     delete createdObject._id
                // }
                console.log('loadUserProducts', products)
                resolve(products)
            })
            .catch((err: any) => handleError(err, 'loadUserProducts'))
    });
}