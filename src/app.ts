import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import compression from "compression";
import bodyParser from "body-parser";
import logger from "morgan";
import errorHandler from "errorhandler";
import helmet from "helmet";

import { EnvConfig } from "./config";

import user from "./apis/user/routes";


export class App {
    private app: express.Application;

    async init(envConfig: EnvConfig) {
        this.app = express();

        this.set("port", envConfig.port);

        this.add(compression());
        this.add(logger("dev"));

        this.add(bodyParser.json());
        this.add(bodyParser.urlencoded({ extended: true }));

        this.add(session({
            resave: true,
            saveUninitialized: true,
            secret: envConfig.sessionSecret,
            store: MongoStore.create({
                mongoUrl: envConfig.mongodbUri,
            })
        }));

        this.add(helmet());

        this.add(errorHandler());

        this.add(user, '/user')

        return this
    }

    public set(name: string, value: any) {
      this.app.set(name, value);
    }

    public add(middleware: any, baseRoute?: string) {
        if (baseRoute)
            this.app.use(baseRoute, middleware);

        this.app.use(middleware);
    }

    public addRange(options: any[]) {
        const self = this;
        options.forEach(function (option) {
            self.app.use(option);
        });
    }

    public addRequestResponseHandler(func: (request: express.Request, response: express.Response, next: () => any) => any) {
        this.app.use(func);
    }

    public getExpress() {
        if (this.app) {
            return this.app;
        }
    }

    public listen(func: () => void) {
        this.app.listen(this.app.get("port"), func);
    }
}


export default new App
