/**
 * Created by samhwang1990@gmail.com.
 */

import {RequestMethod, ResponseError} from 'umi-request';
import {IApiData, IEndpointResponse} from "./types";
import ResponseCode from "../../../../constant/ResponseCode";
import {hookTransportError} from "./hookTransportError";

const errStatusMessage = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

export function useTransportCodeMapper(request: RequestMethod) {
    request.use(async function transportCodeMapper(ctx, next) {
        const codeMap = {
            0: ResponseCode.S_OK,
            401: ResponseCode.FA_UNAUTHORIZED,
            403: ResponseCode.FA_OPERATION_FORBIDDEN,
            404: ResponseCode.FA_OPERATION_NOT_FOUND,
            9003: ResponseCode.FA_ACCESS_TOKEN_INVALID,
        };
        
        let responseErr: ResponseError<IApiData>
    
        try {
            await next();
        } catch (e) {
            responseErr = e
        }
    
        if (!!responseErr) {
            let { code, msg, data} = responseErr.data as IApiData;
            if (!!code) {
                ctx.res = {
                    // @ts-ignore
                    code: codeMap[code],
                    msg,
                    data,
                } as IEndpointResponse
            } else if (codeMap.hasOwnProperty(responseErr.response.status)) {
                ctx.res = {
                    code: codeMap[responseErr.response.status],
                    msg: msg || errStatusMessage[responseErr.response.status] || '',
                    data,
                }
            } else {
                ctx.res = {
                    code: ResponseCode.FA_UNKNOWN_ERROR,
                    msg,
                    data,
                }
            }
        } else {
            let { code, msg, data} = ctx.res as IApiData;
    
            ctx.res = {
                code: code,
                msg,
                data,
            } as IEndpointResponse
        }
    
        if (ctx.res.code !== ResponseCode.S_OK) {
            ctx.res = await hookTransportError.callPromise(ctx.res);
        }
    })
}
