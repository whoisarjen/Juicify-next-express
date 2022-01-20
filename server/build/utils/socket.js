"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandleUserSynchronization = exports.socket = void 0;
const logger_1 = __importDefault(require("./logger"));
const jwt_utils_1 = require("./jwt.utils");
const config_1 = __importDefault(require("config"));
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield redis.connect().then(() => logger_1.default.info("Connection with Redis has been made!")); }))();
function socket({ io }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`Connection with socket has been made!`);
        io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`${socket.id} connected to socket!`);
            const refresh_token = socket.handshake.query.refresh_token;
            if (refresh_token) {
                const { decoded, expired } = yield (0, jwt_utils_1.verifyJWT)(refresh_token);
                if (expired || !decoded || !decoded._id) {
                    // If refresh_token is dead, logout user, but allow synchronization | Does it really gona work? Check token while synchro won't kill connection...?
                    io.to(socket.id).emit('compareDatabases', {
                        "lastUpdated": Object.assign(Object.assign({}, yield synchronizationObject(0)), { logout: new Date().getTime() + 999999999 }),
                        "version": config_1.default.get('APP_VERSION'),
                        "socket_ID": socket.id
                    });
                }
                else {
                    logger_1.default.info(`User ${decoded._id} connected to the socket`);
                    socket.join(decoded._id);
                    io.to(socket.id).emit('compareDatabases', {
                        "lastUpdated": JSON.parse(yield redis.get(decoded._id)) || (yield createSynchronizationObject(decoded._id)),
                        "version": config_1.default.get('APP_VERSION'),
                        "socket_ID": socket.id
                    });
                }
            }
        }));
    });
}
exports.socket = socket;
const createSynchronizationObject = (user_ID) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Creating Synchronization Object for ${user_ID}`);
    yield redis.set(user_ID, JSON.stringify(yield synchronizationObject()));
    return JSON.parse(yield redis.get(user_ID));
});
const synchronizationObject = (timeMS = new Date().getTime()) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        product: timeMS,
        exercise: timeMS,
        workout_plan: timeMS,
        settings: timeMS,
        daily_measurement: timeMS,
        logout: 0
    };
});
const updateSynchronizationObject = (user_ID, where) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Updating Synchronization Object (${where}) for ${user_ID}`);
    let object = JSON.parse(yield redis.get(user_ID));
    object[where] = new Date().getTime();
    yield redis.set(user_ID, JSON.stringify(object));
    return object;
});
function socketHandleUserSynchronization({ req, res, data, where, whatToDo }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield updateSynchronizationObject(res.locals.token._id, where);
        if (req.app.get('socket')) {
            req.app.get('socket').in(res.locals.token._id).except(req.body.socket_ID).emit('synchronizationMessege', {
                where: where,
                whatToDo: whatToDo,
                array: req.body.array,
                socket_ID: req.body.socket_ID
            });
        }
    });
}
exports.socketHandleUserSynchronization = socketHandleUserSynchronization;
