import mongoose from 'mongoose'
import logger from './logger'

const connect = async () => {
    try {
        await mongoose.connect('mongodb://Arjen:Preetini49e89d5b@86.106.91.210:27017/test?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false')
            .then(() => logger.info("Connection with mongoDB has been made!"))
    } catch (err) {
        logger.error(`Connection with mongoDB ended with error: ${err}`)
        process.exit(1)
    }
}

export default connect;