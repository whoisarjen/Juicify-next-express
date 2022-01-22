import { Server, Socket } from "socket.io";
import logger from "./logger";
import { verifyJWT } from "./jwt.utils";
import config from 'config'
import { createClient } from 'redis';
import { Request, Response } from 'express'

const redis: any = createClient();
(async () => await redis.connect().then(() => logger.info("Connection with Redis has been made!")))();

export async function socket({ io }: { io: Server }) {
    logger.info(`Connection with socket has been made!`);

    io.on('connection', async (socket: Socket) => {
        logger.info(`${socket.id} connected to socket!`);
        const refresh_token: any = socket.handshake.query.refresh_token
        if (refresh_token) {
            const { decoded, expired }: any = await verifyJWT(refresh_token)
            if (expired || !decoded || !decoded._id) {
                // If refresh_token is dead, logout user, but allow synchronization | Does it really gona work? Check token while synchro won't kill connection...?
                io.to(socket.id).emit('compareDatabases', {
                    "lastUpdated": { ...await synchronizationObject(0), ...{ logout: new Date().getTime() + 999999999 } },
                    "version": config.get<number>('APP_VERSION'),
                    "socket_ID": socket.id
                })
            } else {
                logger.info(`User ${decoded._id} connected to the socket`)
                socket.join(decoded._id)
                io.to(socket.id).emit('compareDatabases', {
                    "lastUpdated": JSON.parse(await redis.get(decoded._id)) || await createSynchronizationObject(decoded._id),
                    "version": config.get<number>('APP_VERSION'),
                    "socket_ID": socket.id
                })
            }
        }
    });
}

const createSynchronizationObject = async (user_ID: string) => {
    logger.info(`Creating Synchronization Object for ${user_ID}`)
    await redis.set(user_ID, JSON.stringify(await synchronizationObject()))
    return JSON.parse(await redis.get(user_ID))
}

const synchronizationObject = async (timeMS = new Date().getTime()) => {
    return {
        product: timeMS,
        exercise: timeMS,
        workout_plan: timeMS,
        settings: timeMS,
        daily_measurement: timeMS,
        logout: 0
    }
}

const updateSynchronizationObject = async (user_ID: string, where: string) => {
    logger.info(`Updating Synchronization Object (${where}) for ${user_ID}`)
    let object = JSON.parse(await redis.get(user_ID))
    object[where] = new Date().getTime();
    await redis.set(user_ID, JSON.stringify(object))
    return object
}

export async function socketHandleUserSynchronization({ req, res, data, where, whatToDo }: { req: Request, res: Response, data: Array<any>, where: string, whatToDo: string }) {
    await updateSynchronizationObject(res.locals.token._id, where)
    if (req.app.get('socket')) {
        req.app.get('socket').in(res.locals.token._id).except(res.locals.socket_ID).emit('synchronizationMessege', {
            where: where,
            whatToDo: whatToDo,
            array: data,
            socket_ID: res.locals.socket_ID
        })
    }
}