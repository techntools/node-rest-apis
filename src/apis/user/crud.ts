import { EnvConfig } from "../../config";


export class UserCRUD {
    private envConfig: EnvConfig

    init(envConfig: EnvConfig) {
        this.envConfig = envConfig
    }

    async signup(newUser: any) {
        return { message: 'User signed up' }
    }
}


export default new UserCRUD
