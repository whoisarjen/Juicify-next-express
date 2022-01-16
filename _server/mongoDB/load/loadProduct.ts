import productModel from '../models/product'

// const cache = {}

export default async (object: any) => {
    return new Promise(resolve => {
        // const objectConstructor = ({}).constructor;
        // let res = {}
        // if (object.constructor === objectConstructor) res = JSON.parse(JSON.stringify(object))
        // else res = JSON.parse(JSON.stringify(object.toJSON()))
        // if (cache[object.product_ID]) return resolve(Object.assign(res, cache[object.product_ID]));
        productModel.findOne({ _id: object.product_ID })
            .then((product: any) => {
                // let createdObject = {}
                // if (product) {
                //     product = product.toJSON()
                //     createdObject = product
                //     delete createdObject._id
                // }
                console.log('loadProduct', Object.assign(JSON.parse(JSON.stringify(product)), JSON.parse(JSON.stringify(object))))
                resolve(Object.assign(JSON.parse(JSON.stringify(product)), JSON.parse(JSON.stringify(object))))
            })
    });
}