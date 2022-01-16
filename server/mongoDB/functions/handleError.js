module.exports = function handleError(error, where){
    console.log(`Got error in ${where}: ${error}`)
    switch(code){
        default:
            return res.status(500).send({ error: 'Internal Server Error' })
    }
}