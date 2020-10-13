/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";
import {IEnvInfoFromSvr} from "../../../model/EnvInfo";

export function v1_env(transport: ITransport): Promise<IServiceResponse<IEnvInfoFromSvr[]>> {
    return transport.request.get('v1/env')
}

export function v1_env__post(transport: ITransport, name: string): Promise<IServiceResponse<IEnvInfoFromSvr>> {
    return transport.request.post('v1/env', {
        data: {
            envName: name,
        }
    })
}

export function v1_env_$envId(transport: ITransport, envId: string): Promise<IServiceResponse<IEnvInfoFromSvr>> {
    return transport.request.get(`v1/env/${envId}`)
}
