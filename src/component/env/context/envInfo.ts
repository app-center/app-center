/**
 * Created by samhwang1990@gmail.com.
 */
import {IEnvCtxOptions} from "./index";
import {useQueryEnvInfo} from "../../../useHook/useQueryCache";
import {QueryResult} from "react-query/types/core/types";
import {IEnvInfo} from "../../../domain/model/EnvInfo";
import ResponseCode from "../../../constant/ResponseCode";

declare module './index' {
    interface IEnvCtx {
        envInfoQueryResult: QueryResult<IEnvInfo, ResponseCode>;
        
        isEnvInfoFetching: boolean;
        isEnvInfoFetchSucceed: boolean;
        isEnvInfoFetchFailed: boolean;
    
        envInfo?: IEnvInfo
        envInfoFetchError?: ResponseCode;
    }
}

export function withEnvInfo(): IEnvCtxOptions {
    return ctx => {
        const query = useQueryEnvInfo(ctx.envId)
        
        ctx.envInfoQueryResult = query
        ctx.isEnvInfoFetching = query.isLoading
        ctx.isEnvInfoFetchSucceed = query.isSuccess
        ctx.isEnvInfoFetchFailed = query.isError
        ctx.envInfoFetchError = query.error
        ctx.envInfo = query.data
    }
}
