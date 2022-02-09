import { Server, Socket } from "socket.io";
import logger from "./logger";
import { getCookie, verifyJWT } from "./jwt.utils";
import { createClient } from 'redis';
import { Request, Response } from 'express'

const redis: any = createClient({
    url: `redis://:@${process.env.REDIS}`
});

export async function socket({ io }: { io: Server }) {
    await redis.connect().then(() => logger.info("Connection with Redis has been made!"))
    logger.info(`Connection with socket has been made!`);

    io.on('connection', async (socket: Socket) => {
        try {
            const { decoded, expired }: any = await verifyJWT(await getCookie('refresh_token', socket.handshake.headers.cookie) as string)
            if (decoded) {
                if (expired || !decoded || !decoded._id) {
                    logger.error(`User ${decoded} has not valid refresh_token, so got logouted as ${socket.id}`)
                    io.to(socket.id).emit('compareDatabases', {
                        "lastUpdated": { ...await synchronizationObject(0), ...{ logout: new Date().getTime() + 1000 } },
                        "version": process.env.APP_VERSION,
                        "socket_ID": socket.id
                    })
                } else {
                    logger.info(`User ${decoded._id} has valid refresh_token, connected to the socket as ${socket.id}`)
                    socket.join(decoded._id)
                    io.to(socket.id).emit('compareDatabases', {
                        "lastUpdated": JSON.parse(await redis.get(decoded._id)) || await createSynchronizationObject(decoded._id),
                        "version": process.env.APP_VERSION,
                        "socket_ID": socket.id
                    })
                }
            }
        } catch (error: any) {
            logger.error(error)
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