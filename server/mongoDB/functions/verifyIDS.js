const is_id = require('./is_id')

module.exports = async function verifyIDS(req) {
    if (req.body.array && req.body.array.length) {
        req.body.array.map(async x => {
            if (x._id && !await is_id(x._id)) {
                delete x._id
            }
            return x;
        })
    }
}