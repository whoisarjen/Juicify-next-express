module.exports = async function(req){
	return new Promise(resolve => {
		const Model = require('./models/' + req.body.where)
		if(req.body.where == 'product' || req.body.where == 'exercise'){
			for(let i=0;i<req.body.array.length;i++){
				Model.updateOne({
					_id: req.body.array[i]._id,
					user_ID: req.body.user_ID
				},
				[{
					$set: { deleted: true }
				}
				])
				.catch((err) => console.log(err))
				.finally(() => {
					if(i + 1 == req.body.array.length) {
						resolve(true)
					}
				})
			}
		}else{
			for(let i=0;i<req.body.array.length;i++){
				Model.deleteOne({
					_id: req.body.array[i]._id,
					user_ID: req.body.user_ID
				})
				.catch((err) => console.log(err))
				.finally(() => {
					if(i + 1 == req.body.array.length) {
						resolve(true)
					}
				})
			}
		}
	})
}