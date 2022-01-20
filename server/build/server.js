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
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./utils/connect"));
const routes_1 = __importDefault(require("./utils/routes"));
const socket_1 = require("./utils/socket");
const server_1 = __importDefault(require("./utils/server"));
const app = (0, server_1.default)();
const server = app.listen(config_1.default.get('PORT'), () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Listening on port ${config_1.default.get('PORT')} (http://localhost:${config_1.default.get('PORT')})`);
    app.set('socket', io);
    yield (0, connect_1.default)();
    (0, socket_1.socket)({ io });
    (0, routes_1.default)(app);
}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.get('ORIGIN'),
    }
});
