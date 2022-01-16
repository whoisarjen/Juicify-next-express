const cache = {}

module.exports = async (object) => {
    return new Promise(resolve => {
        const objectConstructor = ({}).constructor;
        let res = {}
        if (object.constructor === objectConstructor) res = JSON.parse(JSON.stringify(object))
        else res = JSON.parse(JSON.stringify(object.toJSON()))
        if (cache[object.product_ID]) return resolve(Object.assign(res, cache[object.product_ID]));
        const Model = require('../models/product')
        Model.findOne({ _id: object.product_ID })
            .then(function (product) {
                let createdObject = {}
                if (product) {
                    product = product.toJSON()
                    createdObject = product
                    delete createdObject._id
                }
                resolve(Object.assign(res, createdObject))
            })
    });
}