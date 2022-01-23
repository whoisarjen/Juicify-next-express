import { Server } from "socket.io";
import logger from './utils/logger'
import connect from './utils/connect'
import routes from './utils/routes'
import { socket } from './utils/socket';
import createServer from "./utils/server";
import settings from './settings/default'

const app = createServer();

const server = app.listen(settings.PORT, async () => {
    logger.info(`Listening on port ${settings.PORT} (http://localhost:${settings.PORT})`);
    app.set('socket', io);
    await connect();
    socket({ io })
    routes(app);
});

const io = new Server(server, {
    cors: {
        origin: settings.ORIGIN,
    }
});