/**
 * Created by samhwang1990@gmail.com.
 */

/* eslint-disable react-hooks/rules-of-hooks */

import {extend, RequestMethod} from 'umi-request';
import {useTransportCodeMapper} from "./middlewareTransportCodeMapper";
import {IEndpointHeadersHook, useTransportHeaders} from "./middlewareTransportHeaders";

export interface ITransport {
    readonly request: RequestMethod;
    readonly headerHooks:  IEndpointHeadersHook;
}

export function newTransport(): ITransport {
    const request = extend({
        prefix: '/api/portal/',
        credentials: 'include',
        getResponse: false,
        cache: 'no-store',
        headers: {
            // IE 下仅用缓存：https://support.microsoft.com/en-us/help/234067/how-to-prevent-caching-in-internet-explorer
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Expires': '-1',
        }
    });
    
    const headerHooks = useTransportHeaders(request);
    useTransportCodeMapper(request);
    
    return Object.freeze({
        request,
        headerHooks,
    });
}
