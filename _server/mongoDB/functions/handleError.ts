export default (error: any, where: string) => {
    console.log(`Got error in ${where}: ${error}`)
    // switch (code) {
    //     default:
    //         return res.status(500).send({ error: 'Internal Server Error' })
    // }
}