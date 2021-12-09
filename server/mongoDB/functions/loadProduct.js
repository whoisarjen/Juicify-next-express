const cache = {}

module.exports = async function loadProduct(object){
    return new Promise(resolve => {
        const objectConstructor = ({}).constructor;
        let res = {}
        if(object.constructor === objectConstructor) res = object
        else res = object.toJSON()
        if(cache[object.product_ID]) return resolve(Object.assign(res, cache[object.product_ID]));
        const Model = require('../models/product')
        Model.findOne({_id: object.product_ID})
        .then(function(product){
            let createdObject = {}
            if(product){
                product = product.toJSON()
                createdObject = product
            }
            resolve(Object.assign(res, createdObject))
        })
    });
}