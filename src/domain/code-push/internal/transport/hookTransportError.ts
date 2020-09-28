/**
 * Created by samhwang1990@gmail.com.
 */

import {AsyncSeriesWaterfallHook, ITapDestroy} from '@funnyecho/hamon';
import {IEndpointResponse} from "./types";
import ResponseCode from "../../../../constant/ResponseCode";

export const hookTransportError = new AsyncSeriesWaterfallHook<[IEndpointResponse], IEndpointResponse>((res: IEndpointResponse) => {
    return res.code;
});

export function tapToUnauthorizedHook(cb: (res: IEndpointResponse) => Promise<IEndpointResponse|void>): ITapDestroy {
    let unTapToOperationUnauthorized = hookTransportError.tapPromise(cb, ResponseCode.FA_OPERATION_UNAUTHORIZED);
    let unTapToInvalidAccessToken = hookTransportError.tapPromise(cb, ResponseCode.FA_ACCESS_TOKEN_INVALID);
    let unTapToHttp401 = hookTransportError.tapPromise(cb, ResponseCode.FA_HTTP_401);

    return () => {
        unTapToOperationUnauthorized();
        unTapToInvalidAccessToken();
        unTapToHttp401();
    }
}
