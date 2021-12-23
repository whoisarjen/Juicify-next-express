module.exports = function(req, res, next){
    const Model = require('../models/user')
    Model.findOne({
        'email': new RegExp(req.body.email, "i")
    }).then(function(item){
        if(item){
            if(!item.banned){
    			const password_remind_hash = require('../functions/randomStringGenerator')(30)
                Model.updateOne({
                    "_id": item._id
                },{
                    password_remind_hash: password_remind_hash
                }).then(function(){
                    const emailSettings = require('../../email_settings')

                    let messageTitle = "Password reminder for Juicify!"
                    let messageText = 'We have received a request to remind you of your password. <a href="' + require('../../domain_URL') + 'reset-password/' + item.login + '/' + password_remind_hash + '">Click this link to confirm your request</a>. Then you will receive a new email with your new password. If it is not your request, ignore the email.'
                    
                    if(item.language == 'pl') messageTitle = 'Przywracanie hasła do Juicify'
                    if(item.language == 'pl') messageText = 'Otrzymaliśmy prośbę o przywrócenie hasła do Juicify. <a href="' + require('../../domain_URL') + 'reset-password/' + item.login + '/' + password_remind_hash + '">Naciśnij ten link, aby potwierdzić, że prośba pochodzi od Ciebie</a>. Następnie otrzymasz nowy email, który będzie zawierał nowe dane do logowania. Jeżeli to nie ty ją utworzyłeś, po prostu zignoruj tę wiadomość.'

                    emailSettings(item.email, {
                        'subject': messageTitle,
                        'text': messageText
                    })
                    .then(() => {
                        res.send({})
                    })
                })
            }else return res.status(400).send({ error: 'banned' })
        }else return res.status(404).send({error: 'email_does_not_exists'})
    }).catch()

}