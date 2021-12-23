const loadProduct = require("../functions/loadProduct")

module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){
    
    const Model = require('../models/favourite_product')
    Model.find({ $or: [{ user_ID: req.body.user_ID }] }).then(async function(item){
    	if(item.length>0){
	    	for(let i=0; i<item.length; i++){
	    		item[i] = await loadProduct(item[i])
	    	}
	    }
        res.send({
        	item: item,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)

}