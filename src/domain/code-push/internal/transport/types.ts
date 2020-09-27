/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */

import ResponseCode from "../../../../constant/ResponseCode";

export interface IApiData<T = any> {
    code: number;
    msg?: string;
    data?: T;
}

export interface IEndpointResponse<T = any> {
    code: ResponseCode;
    msg?: string;
    data?: T;
}
