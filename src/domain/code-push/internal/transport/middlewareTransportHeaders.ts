/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */
import {Context, RequestMethod} from "umi-request";
import {AsyncSeriesWaterfallHook} from "@funnyecho/hamon";

export type IEndpointHeaders = Record<string, string>;
export type IEndpointHeadersHook = AsyncSeriesWaterfallHook<[IEndpointHeaders, Context], IEndpointHeaders>;

export function useTransportHeaders(request: RequestMethod): IEndpointHeadersHook {
    const hookEndpointHeaders = new AsyncSeriesWaterfallHook<[IEndpointHeaders, Context], IEndpointHeaders>();
    
    request.use(async function transportHeaders(ctx, next) {
        const headers = await hookEndpointHeaders.callPromise({}, ctx);
        
        if (headers) {
            ctx.req.options.headers = {
                ...(ctx.req.options.headers || {}),
                ...headers,
            }
        }
        
        await next();
    });
    
    return hookEndpointHeaders;
}
