/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */

import IServiceResponse from "./IServiceResponse";
import {IUnsubscribeToUnAuthorized} from "./IAuthorization";
import {IBranchInfo} from "./model/BranchInfo";

export default interface IBranchService {
    subscribeToUnAuthorized(cb: (res: IServiceResponse) => Promise<IServiceResponse|void>): IUnsubscribeToUnAuthorized;
    checkAuthorized(): Promise<boolean>;
    
    persistAccessToken(token: string): IServiceResponse;
    queryAccessToken(): string;
    evictAccessToken(): void;
    
    logout(): Promise<IServiceResponse>;
    
    getBranchInfo(): Promise<IServiceResponse<IBranchInfo>>;
    getBranchId(): string
}
