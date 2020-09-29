/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";

interface IBranchInfoFromSvr {
    id: string;
    name: string;
    createAt: number;
}

export function v1Branch(transport: ITransport): Promise<IServiceResponse<IBranchInfoFromSvr>> {
    return transport.request.get('v1/branch')
}
