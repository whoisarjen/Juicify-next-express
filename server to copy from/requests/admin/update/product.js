module.exports = function(req, res, next, tokenGenerated, tokenRefreshGenerated){
    return new Promise(res => {
        const Model = require('../../models/product')
        for(let i=0; i<req.body.array.length; i++){
            if(req.body.array[i].user_ID) delete req.body.array[i].user_ID
            if(req.body.array[i].code){
                Model.updateMany({
                    code: req.body.array[i].code
                },{
                    $set: {
                        deleted: true
                    },
                    $unset: {
                        checkMe: ""
                    }
                })
                .then(() => {
                    Model.findOneAndReplace({
                        "_id": req.body.array[i]._id
                    },
                    req.body.array[i]
                    )
                    .catch(next)
                    .finally(() => {
                        if(i + 1 == req.body.array.length){
                            res({
                                tokenGenerated: tokenGenerated,
                                tokenRefreshGenerated: tokenRefreshGenerated
                            })
                        }
                    })
                })
            }else{
                Model.findOneAndReplace({
                    "_id": req.body.array[i]._id
                },
                req.body.array[i]
                )
                .catch(next)
                .finally(() => {
                    if(i + 1 == req.body.array.length){
                        res({
                            tokenGenerated: tokenGenerated,
                            tokenRefreshGenerated: tokenRefreshGenerated
                        })
                    }
                })
            }
        }
    })
}