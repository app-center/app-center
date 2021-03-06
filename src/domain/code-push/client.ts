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
import {VersionService} from "./versionService";
import {IVersionService} from "../IVersion";
import {UploadService} from "./uploadService";
import {IUploadService} from "../IUpload";

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
    private readonly _versionService: VersionService
    private readonly _uploadService: UploadService
    
    constructor() {
        this.transport = newTransport()
        
        this._authorizationService = new AuthorizationService(this)
        this._branchService = new BranchService(this)
        this._envService = new EnvService(this)
        this._versionService = new VersionService(this)
        this._uploadService = new UploadService(this)
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
    
    public get versionService(): IVersionService {
        return this._versionService
    }
    
    public get uploadService(): IUploadService {
        return this._uploadService
    }
}
