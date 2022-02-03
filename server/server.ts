import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, override: true })
import { Server } from "socket.io";
import logger from './utils/logger'
import connect from './utils/connect'
import routes from './utils/routes'
import { socket } from './utils/socket';
import createServer from "./utils/server";
import * as fs from 'fs';
import * as https from 'https';

const app = createServer();

let server;
logger.info(`Server is using ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV == "development") {
    server = app.listen(process.env.PORT, async () => {
        logger.info(`Listening on port ${process.env.PORT} (http://localhost:${process.env.PORT})`);
        app.set('socket', io);
        await connect();
        socket({ io })
        routes(app);
    });
}

if (process.env.NODE_ENV == "production") {
    server = https.createServer({
        key: fs.readFileSync(`./../../../../etc/letsencrypt/live/${process.env.COOKIE_DOMAIN}/privkey.pem`),
        cert: fs.readFileSync(`./../../../../etc/letsencrypt/live/${process.env.COOKIE_DOMAIN}/fullchain.pem`)
    }, app).listen(process.env.PORT, async () => {
        logger.info(`Listening on port ${process.env.PORT} (http://localhost:${process.env.PORT})`);
        app.set('socket', io);
        await connect();
        socket({ io })
        routes(app);
    })
}

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
    }
});