module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

    const Model = require('../models/message')
    Model.find({ $or: [{ customer_ID: req.body.user_ID },{ customer_ID: 0 }], whenAdded: { $lt: req.body.underDatePlusTheDate } })
    .sort({"whenAdded": -1})
    .limit(req.body.limitOfResults)
    .then(function(item){
        res.send({
            item: item,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)
    
}