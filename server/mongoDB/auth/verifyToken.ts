const verifyToken = (req, res) => {
    return new Promise(resolve => {
        console.log('VerifyToken starting...')
        const jwt = require("jsonwebtoken");
        const tokenKEY = require("./tokenKEY")

        console.log(req.body.token)
        console.log(req.body.refresh_token)
        new Promise(res => setTimeout(res, 4000));

        jwt.verify(req.body.token, tokenKEY, (err, decodedToken) => {
            console.log('err', err)
            console.log('Decoded token successfully', decodedToken)
            if (decodedToken) {
                overwriteDate(decodedToken._id)
            } else {
                console.log('Token is expired')
                jwt.verify(req.body.refresh_token, tokenKEY, (err2, decodedRefreshToken) => {
                    console.log('err2', err2)
                    console.log('Decoded refresh_token successfully', decodedRefreshToken)
                    if (decodedRefreshToken) {
                        console.log('Starting refreshing tokens')
                        const Model = require('../models/user')
                        Model.findOne({
                            '_id': decodedRefreshToken._id
                        }).then(function (user) {
                            if (user) {
                                if (!user.banned) {
                                    req.body.token = require('./tokenGENERATOR')([user])
                                    req.body.refresh_token = require('./tokenRefreshGENERATOR')([user])
                                    console.log('created new token')
                                    overwriteDate(decodedRefreshToken._id)
                                } else {
                                    // return res.status(400).send({ error: 'logout' })
                                    logout()
                                }
                            } else {
                                // return res.status(400).send({ error: 'logout' })
                                logout()
                            }
                        }).catch(err => console.log(err))
                    } else {
                        console.log('Logout bro!')
                        // return res.status(400).send({ error: 'logout' })
                        logout()
                    }
                })
            }
        })

        function overwriteDate(_id) {
            console.log('Starting overwritting data')
            req.body.user_ID = _id
            if (req.body.array && req.body.array.length) {
                for (let i = 0; i < req.body.array.length; i++) {
                    req.body.array[i].user_ID = _id
                }
            }
            console.log('Ended overwritting data')
            resolve(true)
        }

        function logout() {
            overwriteDate('60ba774fe0ecd72587eeaa29')
            console.log(`Don't forget to create logout function in verifyToken`)
            resolve(true)
        }
    })
};

export default verifyToken;