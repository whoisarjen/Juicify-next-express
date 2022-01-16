module.exports = async function is_id(_id) {
    return new Promise(resolve => {
        (_id).substring(0, 2) != "XD" ? resolve(true) : resolve(false)
    })
}