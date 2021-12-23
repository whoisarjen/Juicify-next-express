module.exports = function(req, res, next){

    const emailSettings = require('../email_settings')
    emailSettings('KamilOw97@gmail.com', {
        'subject': req.body.array[0].title + " from " + req.body.array[0].login,
        'text': 'Email to contact: ' + req.body.array[0].email + ' </br></br>Message: ' + req.body.array[0].message
    })
    .then((res) => {
        console.log(res)
        res.send({})
    })
    .catch(next)

}