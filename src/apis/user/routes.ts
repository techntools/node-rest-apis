import express from 'express'
import { Request, Response, NextFunction } from "express";

import userController from "./controller";


class UserRoutes {
    public router: express.Router
    public readonly basePath = '/user'

    constructor() {
        this.router = express.Router()

        this.router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
            const ret = await userController.signup(req.body)
            res.status(ret.status).json(ret)
        })

        this.router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
            const ret = await userController.signin(req.body)
            res.status(ret.status).json(ret)
        })
    }
}


export default new UserRoutes
