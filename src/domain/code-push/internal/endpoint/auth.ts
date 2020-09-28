/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";
import {ILoginResult} from "../../../model/Authentication";
import {IBranchId} from "../../../model/BranchInfo";

export function auth(transport: ITransport, token: string): Promise<IServiceResponse<ILoginResult>> {
    return transport.request.post('auth/jwt', {
        data: {
            token,
        }
    });
}

export function refreshAuth(transport: ITransport, token: string): Promise<IServiceResponse<{branchId: IBranchId}>> {
    return transport.request.get(`auth/${token}`)
}
