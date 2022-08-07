import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import compression from "compression";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";
import * as OpenApiValidator from 'express-openapi-validator';

import { EnvConfig } from "./config";
import userRoutes from "./apis/user/routes";
import { RequestHandler, RequestError } from "./types/request";


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

        this.add(
            OpenApiValidator.middleware({
                apiSpec: './src/apis.yaml',
            }),
        );

        this.add(this.sendJSON)

        this.add(userRoutes.router, userRoutes.basePath)

        this.add((err: RequestError, req: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500).json({
                success: false,
                message: err.message,
                errors: err.errors,
            });
        });

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

    public addRequestResponseHandler(func: RequestHandler) {
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

    public sendJSON(req: Request, res: Res, next: NextFunction) {
        res.sendJSON = function(body, status) {
            res.status(status).json(body)
        }

        next()
    }
}


export default new App
