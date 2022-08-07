import express from "express"


interface RequestHandler {
    (request: express.Request, response: express.Response, next: express.NextFunction): void
}

interface RequestError extends Error {
    status?: number,
    errors?: []
}


export { RequestHandler, RequestError, }
