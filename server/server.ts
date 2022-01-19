import { Server } from "socket.io";
import logger from './utils/logger'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import connect from './utils/connect'
// import routes from './utils/routes'
import { socket } from './utils/socket';
import createServer from "./utils/server";

const app = createServer();

const server = app.listen(config.get<number>('PORT'), async () => {
    logger.info(`Listening on port ${config.get<number>('PORT')} (http://localhost:${config.get<number>('PORT')})`);
    app.set('socket', io);
    await connect();
    socket({ io })
    // routes(app);
});

const io = new Server(server, {
    cors: {
        origin: config.get('ORIGIN'),
    }
});