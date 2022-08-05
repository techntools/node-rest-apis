import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

import { User, IUser, AuthToken } from "./model";
import userCRUD from "./crud";
import { EnvConfig } from "../../config";


export class UserController {
    private envConfig: EnvConfig

    init(envConfig: EnvConfig) {
        this.envConfig = envConfig
    }

    /**
     * Create a new account.
     */
    async signup(body: any) {
        return await userCRUD.signup(body)
    };

    /**
     * Login to account.
     */
    async signin(creds: any) {
        return await userCRUD.signin(creds)
    };

    /**
     * Login Required middleware.
     */
    async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    };

    /**
     * Authorization Required middleware.
     */
    async isAuthorized(req: Request, res: Response, next: NextFunction) {
    };
}


export default new UserController;
