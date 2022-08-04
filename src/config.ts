export class EnvConfig {
    readonly port: number
    readonly mongodbUri: string
    readonly sessionSecret: string

    constructor() {
        this.port = Number(process.env.PORT)
        this.mongodbUri = process.env.MONGODB_URI
        this.sessionSecret = process.env.SESSION_SECRET
    }
}
