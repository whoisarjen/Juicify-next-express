module.exports = function( length ){

    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let string = []
    let password_remind_hash = ''

    for(let i=0; i<length ; i++){
        password_remind_hash += characters[ parseInt( Math.random() * (characters.length - 1) + 0 ) ]
    }

    return password_remind_hash

}