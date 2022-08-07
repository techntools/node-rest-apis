declare global {
    namespace Express {
        export interface Response {
            sendJSON: (body: {}, status?: number) => void
        }
    }
}

export {}
