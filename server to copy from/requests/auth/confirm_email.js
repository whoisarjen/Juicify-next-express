module.exports = function(req, res, next){

    const Model = require('../models/user')
    Model.findOne({
        'login': req.body.user_ID
    }).then(function(item){
        if(item){
            if(!item.banned){
                if(item._id == req.body.code){
                    Model.updateOne({
                        "_id": item._id
                    },{
                        email_confirmation: true
                    }).then(function(){
                        res.send({})
                    })
                }else return res.status(400).send({ error: 'code_does_not_exists' })
            }else return res.status(400).send({ error: 'banned' })
        }else return res.status(404).send({error: 'user_does_not_exists'})
    }).catch()

}