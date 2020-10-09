/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";
import {IBranchInfoFromSvr} from "../../../model/BranchInfo";

export function v1_branch(transport: ITransport): Promise<IServiceResponse<IBranchInfoFromSvr>> {
    return transport.request.get('v1/branch')
}
