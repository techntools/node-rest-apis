import app, { App } from "./app";
import { EnvConfig } from "./config";
import connector, { Connector } from "./connections";


class Server {
    private envConfig: EnvConfig;
    private app: App;
    private connector: Connector;

    async init() {
        process.on('SIGTERM', () => {
            console.log('SIGTERM received')
            this.shutdown()
        })

        process.on('SIGINT', () => {
            console.log('SIGINT received')
            this.shutdown()
        })

        process.on('uncaughtException', this.shutdown)
        process.on('unhandledRejection', this.shutdown)

        this.envConfig = new EnvConfig

        this.connector = await connector.init(this.envConfig.mongodbUri)

        this.app = await app.init(this.envConfig)
        this.app.listen(() => {
            console.log(("  App is running at http://localhost:%s"), process.env.PORT);
            console.log("  Press CTRL-C to stop\n");
        });
    }

    async shutdown(err?: Error) {
        if(err)
            console.log(err)

        try {
            if(this.connector)
                await this.connector.close()
        } catch(err) {
            console.log(err)
        }

        setTimeout(() => {
            process.exit(err ? 1 : 0)
        }, 2000)
    }
}

(async () => {
    const server = new Server;
    await server.init();
})()
