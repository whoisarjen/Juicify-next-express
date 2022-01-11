const handleError = (error: any, where: string, res: any) => {
    console.log(`Got error in ${where}: ${error}`)
    
    const code = 500 // to change later

    switch(code){
        default:
            return res.status(500).send({ error: 'Internal Server Error' })
    }
}

export default handleError;