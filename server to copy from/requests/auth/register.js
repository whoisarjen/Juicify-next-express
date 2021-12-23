module.exports = function(req, res, next){
    
    const Model = require('../models/user');

    if(req.body.array[0]._id) delete req.body.array[0]._id
    if(req.body.array[0].users_roles_ID) delete req.body.array[0].users_roles_ID

    const bcrypt = require('bcrypt');
    Model.find({
        $or: [
            {'login': new RegExp("^" + req.body.array[0].user_ID + "$", "i")},
            {'email': new RegExp("^" + req.body.array[0].email + "$", "i")}
        ]
    }).then(function(item){
        if(item.length == 0){
            bcrypt.hash(req.body.array[0].password, 10, function(err, hash) {
                req.body.array[0].password = hash
                Model.create(req.body.array).then(function(user){
                    req.body.array[0].user_ID = user[0]._id
                    Model2 = require('../models/daily_measurement')
                    Model2.create(req.body.array).then(function(){
                        const emailSettings = require('../../email_settings')

                        let messageTitle = "Activation link to Juicify!"
                        let messageText = 'Your account has been created! Click this link to activate it and then sign in => ' + require('../../domain_URL') + 'login/' + user[0].login + '/' + user[0]._id
                        
                        if(user[0].language == 'pl') messageTitle = 'Link aktywacyjny konta w Juicify'
                        if(user[0].language == 'pl') messageText = 'Twoje konto zostało utworzone. Naciśnij ten link, aby je aktywować i odblokować możliwość logowania => ' + require('../../domain_URL') + 'login/' + user[0].login + '/' + user[0]._id
                        
                        emailSettings(user[0].email, {
                            'subject': messageTitle,
                            'text': messageText
                        })
                        .then(() => {
                            res.send({})
                        })
                        .catch(next)
                    }).catch(next)
                }).catch(next)
            });
        }else res.status(404).send({error: 'user_already_exists'})
    }).catch(next)

}