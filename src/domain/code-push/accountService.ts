/**
 * Created by samhwang1990@gmail.com.
 */
import IAccountService from "../IAccount";
import IServiceResponse from "../IServiceResponse";
import {IUnsubscribeToUnAuthorized} from "../IAuthorization";
import {IClient} from "./client";

export class AccountService implements IAccountService {
    public readonly client: IClient;
    
    constructor(client: IClient) {
        this.client = client;
    }
    
    checkAuthorized(): Promise<boolean> {
        return Promise.resolve(false);
    }
    
    evictAccessToken(): void {
    }
    
    logout(): Promise<IServiceResponse> {
        return Promise.resolve(undefined);
    }
    
    persistAccessToken(token: string): IServiceResponse {
        return undefined;
    }
    
    queryAccessToken(): string {
        return "";
    }
    
    subscribeToUnAuthorized(cb: (res: IServiceResponse) => Promise<IServiceResponse | void>): IUnsubscribeToUnAuthorized {
        return undefined;
    }
    
}
