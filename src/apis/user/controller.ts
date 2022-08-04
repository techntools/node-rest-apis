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
    public async signup(body: any) {
        return await userCRUD.signup(body)
    };

    /**
     * Login to account.
     */
    public signin(creds: any) {
    };

    /**
     * Login Required middleware.
     */
    public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    };

    /**
     * Authorization Required middleware.
     */
    public isAuthorized(req: Request, res: Response, next: NextFunction) {
    };
}


export default new UserController;
