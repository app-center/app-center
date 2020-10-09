/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport, newTransport} from "./internal/transport";
import {RequestMethod} from "umi-request";
import {IEndpointHeadersHook} from "./internal/transport/middlewareTransportHeaders";
import {AuthorizationService} from "./authorizationService";
import IAuthorizationService from "../IAuthorization";
import {BranchService} from "./branchService";
import IBranchService from "../IBranch";
import {EnvService} from "./envService";
import {IEnvService} from "../IEnv";

export function newClient(): Client {
    const client = new Client();
    
    return client;
}

export type IClient = Client;

class Client implements ITransport {
    private readonly transport: ITransport
    private readonly _authorizationService: AuthorizationService
    private readonly _branchService: BranchService
    private readonly _envService: EnvService
    
    constructor() {
        this.transport = newTransport()
        
        this._authorizationService = new AuthorizationService(this)
        this._branchService = new BranchService(this)
        this._envService = new EnvService(this)
    }
    
    public get request(): RequestMethod {
        return this.transport.request
    }
    
    public get headerHooks(): IEndpointHeadersHook {
        return this.transport.headerHooks;
    }
    
    public get authorizationService(): IAuthorizationService {
        return this._authorizationService
    }
    
    public get branchService(): IBranchService {
        return this._branchService
    }
    
    public get envService(): IEnvService {
        return this._envService
    }
}
