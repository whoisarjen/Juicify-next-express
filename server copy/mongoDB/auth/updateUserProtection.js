module.exports = async function (array) {
    return new Promise(resolve => {
        let newArray = JSON.parse(JSON.stringify(array))
        if (newArray[0]._id) delete newArray[0]._id
        if (newArray[0].login) delete newArray[0].login
        if (newArray[0].email) delete newArray[0].email
        if (newArray[0].users_roles_ID) delete newArray[0].users_roles_ID
        if (newArray[0].registered) delete newArray[0].registered
        if (newArray[0].banned) delete newArray[0].banned
        resolve(newArray)
    })
}