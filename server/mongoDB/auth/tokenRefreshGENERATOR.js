module.exports = function (array) {
    const jwt = require("jsonwebtoken");
    const tokenKEY = require("./tokenKEY");
    return jwt.sign({
        _id: array[0]._id,
        users_roles_ID: array[0].users_roles_ID
    },
        tokenKEY, {
        expiresIn: '28d'
    })
}