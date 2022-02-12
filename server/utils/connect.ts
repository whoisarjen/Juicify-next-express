import mongoose from 'mongoose'
import logger from './logger'

const connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_STRING_IP_LOGIN_PART}${process.env.MONGODB_STRING_DETAILS_PART}`)
            .then(() => logger.info("Connection with mongoDB has been made!"))
    } catch (err) {
        logger.error(`Connection with mongoDB ended with error: ${err}`)
        process.exit(1)
    }
}

export default connect;