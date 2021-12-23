const loadProduct = require("../functions/loadProduct")

module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	const Model = require('../models/favourite_product')
    Model.create(req.body.array).then(async function(model){
    	for(let i=0; i<req.body.array.length; i++){
    		if(req.body.array[i].loginFromToken) delete req.body.array[i].loginFromToken
    		req.body.array[i]._id = model[i]._id
    		req.body.array[i] = await loadProduct(req.body.array[i])
    	}
    	model = req.body.array
        res.send({
            model: model,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)

}