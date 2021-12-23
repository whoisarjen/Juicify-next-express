module.exports = async function(req, res, next, getAllOwnProducts, tokenGenerated, tokenRefreshGenerated){
    return new Promise(res => {
        const Model = require('../../models/product')
        let array = []
        Model.find({
            $and: [ { checkMe: true },
            { deleted: { $exists: false } } ]
        })
        .limit(req.body.limit)
        .sort({ _id: 1 })
        .then(function(item){
            array = item
        })
        .finally(() => {
            res({
                array: array,
                tokenGenerated: tokenGenerated,
                tokenRefreshGenerated: tokenRefreshGenerated
            })
        })
    })
}