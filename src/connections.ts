import mongoose from 'mongoose'

export class Connector {
    private databaseURI: string

    async init(databaseURI: string) {
        this.databaseURI = databaseURI

        await mongoose.connect(this.databaseURI, {
            // reconnectTries: Number.MAX_VALUE,
            // reconnectInterval: 1000,
        })

        return this
    }

    async close() {
        await mongoose.connection.close()
    }
}

export default new Connector
