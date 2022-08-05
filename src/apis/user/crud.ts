import { EnvConfig } from "../../config";
import { SuccessResponse, FailureResponse } from "../../utils/server-response";


export class UserCRUD {
    private envConfig: EnvConfig

    init(envConfig: EnvConfig) {
        this.envConfig = envConfig
    }

    async signup(newUser: any) {
        return new SuccessResponse(
            'Sign up successfull'
        )
    }

    async signin(creds: any) {
        return new FailureResponse(
            'Sign in failed',
            {},
            400
        )
    }
}


export default new UserCRUD
