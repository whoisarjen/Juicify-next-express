module.exports = verifyToken = async (req) => {
    console.log('verifyToken did the job')
    req.body.user_ID = '60ba774fe0ecd72587eeaa29'
    req.body.token = {}
    req.body.token.sex = 1
    req.body.token.height = 190
};