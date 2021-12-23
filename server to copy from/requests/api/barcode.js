module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

	const Model = require('../models/product')
	Model.findOne({
		$and: [{ code: req.body.array[0].barcode },
		{ $or: [ { user_ID: { $exists: false } }, { user_ID: req.body.user_ID } ] }]
	})
	.sort({ user_ID: 1 })
	.then(async function(item){
		res.send({
			item: item,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
		})
	}).catch(next)
}