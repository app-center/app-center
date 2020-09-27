/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */
import {ITransport, newTransport} from "./internal/transport";
import {RequestMethod} from "umi-request";
import {IEndpointHeadersHook} from "./internal/transport/middlewareTransportHeaders";

export function newClient(): Client {
    const client = new Client();
    
    return client;
}

export type IClient = Client;

class Client implements ITransport {
    private readonly transport: ITransport;
    
    constructor() {
        this.transport = newTransport()
    }
    
    public get request(): RequestMethod {
        return this.transport.request
    }
    
    public get headerHooks(): IEndpointHeadersHook {
        return this.transport.headerHooks;
    }
}
