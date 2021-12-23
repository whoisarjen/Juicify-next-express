module.exports = function(req, res, next){

    const Model = require('../models/user')
    const bcrypt = require('bcrypt');
    Model.findOne({
        'login': new RegExp(req.body.login, "i"),
        'password_remind_hash': req.body.code
    }).then(function(item){
        if(item){
            if(!item.banned){
                const new_generated_password = require('../functions/randomStringGenerator')(30)
                bcrypt.hash(new_generated_password, 10, function(err, hash) {
                    Model.updateOne({
                        "_id": item._id
                    },{
                        password: hash
                    }).then(function(){
                        const emailSettings = require('../../email_settings')

                        let messageTitle = "Your new password for Juicify!"
                        let messageText = 'Your new password for Juicify: ' + new_generated_password + "<br> We recommend that you immediately change your password after. You can do so on the settings page of your account."
                        
                        if(item.language == 'pl') messageTitle = 'Twoje nowe hasło do Juicify'
                        if(item.language == 'pl') messageText = 'Twoje nowe hasło do Juicify: ' + new_generated_password + "<br> Zalecamy niezwłoczne zmienienie. Możesz tego dokonać w ustawieniach konta."
                        
                        emailSettings(item.email, {
                            'subject': messageTitle,
                            'text': messageText
                        })
                        .then(() => {
                            res.send({})
                        })
                    })
                })
            }else return res.status(400).send({ error: 'banned' })
        }else return res.status(404).send({error: 'code_does_not_exists'})
    }).catch(next)

}