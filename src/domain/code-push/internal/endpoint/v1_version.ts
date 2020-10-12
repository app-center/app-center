/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import {IReleaseVersionForm} from "../../../model/VersionInfo";
import IServiceResponse from "../../../IServiceResponse";

export function v1_version(transport: ITransport, form: IReleaseVersionForm): Promise<IServiceResponse> {
    return transport.request.post('v1/version', {
        data: {
            ...form
        }
    })
}
