module.exports = async function(req, res, next, tokenGenerated, tokenRefreshGenerated){

    if(req.body.token && req.body.token.users_roles_ID == 9999){
        for(let i=0; i<req.body.array.length; i++){
            if(req.body.array[i].user_ID) delete req.body.array[i].user_ID
        }
    }

	const Model = require('../models/exercise')
    Model.create(req.body.array).then(function(model){
        res.send({
            model: model,
            tokenGenerated: tokenGenerated,
            tokenRefreshGenerated: tokenRefreshGenerated
        })
    }).catch(next)
}