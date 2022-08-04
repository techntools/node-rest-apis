import express from 'express'
import { Request, Response, NextFunction } from "express";

import userController from "./controller";


const router = express.Router()


router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const ret = await userController.signup(req.body)
    res.json(ret)
})


export default router
