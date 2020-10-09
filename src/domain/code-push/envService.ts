/**
 * Created by samhwang1990@gmail.com.
 */
import {IEnvService} from "../IEnv";
import {IClient} from "./client";
import IServiceResponse from "../IServiceResponse";
import {IEnvInfo} from "../model/EnvInfo";
import {v1_env, v1_env_$envId} from "./internal/endpoint/v1_env";
import ResponseCode from "../../constant/ResponseCode";

export class EnvService implements IEnvService {
    public readonly client: IClient;
    
    constructor(client: IClient) {
        this.client = client;
    }
    async fetchEnvInfo(envId: string): Promise<IServiceResponse<IEnvInfo>> {
        if (!envId) {
            return {
                code: ResponseCode.FA_INVALID_PARAMS,
            }
        }
        return v1_env_$envId(this.client, envId)
    }
    
    fetchEnvList(): Promise<IServiceResponse<IEnvInfo[]>> {
        return v1_env(this.client);
    }
    
}
