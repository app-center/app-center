/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */

import IServiceResponse from "./IServiceResponse";
import {ILoginResult} from "./model/Authentication";

export type IUnsubscribeToUnAuthorized = () => void;

export default interface IAuthorizationService {
    signIn(id, token: string): Promise<IServiceResponse<ILoginResult>>;
}
