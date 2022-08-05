import express from "express";


interface ReqHandler {
    (request: express.Request, response: express.Response, next: express.NextFunction): void
}

interface RequestError extends Error {
    status?: number,
    errors?: []
}


export { ReqHandler, RequestError }
