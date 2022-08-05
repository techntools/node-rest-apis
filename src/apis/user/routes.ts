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
            res.json(ret)
        })

        return this
    }
}


export default new UserRoutes
