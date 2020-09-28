/**
 * Created by samhwang1990@gmail.com.
 */

import ResponseCode from "../../../../constant/ResponseCode";

export interface IApiData<T = any> {
    code: ResponseCode;
    msg?: string;
    data?: T;
}

export interface IEndpointResponse<T = any> {
    code: ResponseCode;
    msg?: string;
    data?: T;
}
