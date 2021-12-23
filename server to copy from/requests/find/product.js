module.exports = async function(req, res, next, getAllOwnProducts, tokenGenerated, tokenRefreshGenerated){
    return new Promise(res => {
        const Model = require('../models/product')
        let array = []
        if(getAllOwnProducts){
            Model.find({
                $and: [ { user_ID: req.body.user_ID },
                { deleted: { $exists: false } } ]
            })
            .then(function(item){
                array = item
            })
            .finally(() => {
                res(array)
            })
        }else{
            let regex = { name: { $regex: req.body.key, $options: 'im'} }
            if(req.body.key.split(" ").length > 1) regex = { $text: { $search: req.body.key.split(" ").map(str => "\""+str+"\"").join(' ') } }
            Model.find({
            	$and: [ { user_ID: { $exists: false } },
                { deleted: { $exists: false } },
                regex ]
            })
            .sort({ l: 1, v: -1 })
            .limit(10)
            .then(function(item){
                array = item
                array = array.sort((a, b) => b.l - a.l || Number(b.v) - Number(a.v));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                res(array)
            })
        }
    })
}