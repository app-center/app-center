/**
 * Created by samhwang1990@gmail.com.
 */

import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";

export function v1_logout(transport: ITransport): Promise<IServiceResponse> {
    return transport.request.post('v1/logout')
}

