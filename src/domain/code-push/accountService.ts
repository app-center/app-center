/**
 * Created by samhwang1990@gmail.com.
 */
import IAccountService from "../IAccount";
import IServiceResponse from "../IServiceResponse";
import {IUnsubscribeToUnAuthorized} from "../IAuthorization";
import {IClient} from "./client";
import {LS_ACCESS_TOKEN} from "../../constant/StorageKey";
import ResponseCode from "../../constant/ResponseCode";
import {HttpHeaders} from "../../constant/HttpHeader";
import {tapToUnauthorizedHook} from "./internal/transport/hookTransportError";
import {refreshAuth} from "./internal/endpoint/auth";
import {IBranchId} from "../model/BranchInfo";

export class AccountService implements IAccountService {
    public readonly client: IClient;
    private branchId: IBranchId;
    
    constructor(client: IClient) {
        this.client = client;
    
        this.client.headerHooks.tapPromise(async (headers) => {
            headers[HttpHeaders.AUTHORIZATION] = this.queryAccessToken();
        });
    }
    
    subscribeToUnAuthorized(cb: (res: IServiceResponse) => Promise<IServiceResponse | void>): IUnsubscribeToUnAuthorized {
        return tapToUnauthorizedHook(cb);
    }
    
    async checkAuthorized(): Promise<boolean> {
        const {code, data} = await refreshAuth(this.client, this.queryAccessToken())
        if (code !== ResponseCode.S_OK) {
            return false
        }
        
        this.branchId = data.branchId
        return true
    }
    
    evictAccessToken(): void {
        localStorage.removeItem(LS_ACCESS_TOKEN);
    }
    
    persistAccessToken(token: string): IServiceResponse {
        if (!token) {
            localStorage.removeItem(LS_ACCESS_TOKEN);
            return {
                code: ResponseCode.S_OK,
            }
        }
    
        if (typeof token !== 'string') {
            return {
                code: ResponseCode.FA_ACCESS_TOKEN_INVALID,
            }
        }
    
        localStorage.setItem(LS_ACCESS_TOKEN, token);
    
        return {
            code: ResponseCode.S_OK,
        }
    }
    
    queryAccessToken(): string {
        return localStorage.getItem(LS_ACCESS_TOKEN) || '';
    }
    
    logout(): Promise<IServiceResponse> {
        return Promise.resolve(undefined);
    }
}
