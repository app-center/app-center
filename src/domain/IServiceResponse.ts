/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */

import ResponseCode from "../constant/ResponseCode";

export default interface IServiceResponse<T = any> {
    code: ResponseCode;
    errMsg?: string | [string, Record<string, any>];
    data?: T;
}
