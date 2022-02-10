import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import deserializeUser from "../mongoDB/middleware/deserializeUser";
import routes from "./routes";

function createServer() {
    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(deserializeUser)
    app.use(cors({
        origin: process.env.ORIGIN,
        credentials: true
    }));
    app.use(bodyParser.json({ limit: '5mb' }));

    routes(app);

    return app;
}

export default createServer;