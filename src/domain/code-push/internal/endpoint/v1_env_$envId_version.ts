/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "../../../IServiceResponse";
import {IVersionInfoFromSvr} from "../../../model/VersionInfo";
import {ITransport} from "../transport";

export function v1_env_$envId_version(transport: ITransport, envId: string): Promise<IServiceResponse<IVersionInfoFromSvr[]>> {
    return transport.request.get(`v1/env/${envId}/version`)
}
