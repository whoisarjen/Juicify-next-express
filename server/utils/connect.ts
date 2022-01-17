import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const connect = async () => {
    const dbURI = config.get<string>('DB_URI')

    try {
        await mongoose.connect(dbURI)
            .then(() => logger.info("Connection with mongoDB has been made!"))
    } catch (err) {
        logger.error(`Connection with mongoDB ended with error: ${err}`)
        process.exit(1)
    }
}

export default connect;