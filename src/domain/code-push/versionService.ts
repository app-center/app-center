/**
 * Created by samhwang1990@gmail.com.
 */
import {IVersionService} from "../IVersion";
import {IClient} from "./client";
import {IReleaseVersionForm, IVersionInfo} from "../model/VersionInfo";
import IServiceResponse from "../IServiceResponse";
import ResponseCode from "../../constant/ResponseCode";
import {v1_env_$envId_version} from "./internal/endpoint/v1_env_$envId_version";
import {v1_version} from "./internal/endpoint/v1_version";

export class VersionService implements IVersionService {
    public readonly client: IClient;
    
    constructor(client: IClient) {
        this.client = client;
    }
    
    async fetchVersionList(envId: string): Promise<IServiceResponse<IVersionInfo[]>> {
        if (!envId) {
            return {
                code: ResponseCode.FA_INVALID_PARAMS,
            }
        }
        return v1_env_$envId_version(this.client, envId)
    }
    
    async releaseVersion(params: IReleaseVersionForm): Promise<IServiceResponse> {
        if (!params || !params.envId || !params.appVersion || !params.changelog || !params.packageFileKey) {
            return {
                code: ResponseCode.FA_INVALID_PARAMS
            }
        }
        
        return v1_version(this.client, params)
    }
}
