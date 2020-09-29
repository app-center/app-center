/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import {useCreation} from "@umijs/hooks";
import {QueryCache} from "react-query";

declare module './index' {
    interface IHomeCtx {
        queryCache
    }
}

export function withQueryCache(): IHomeCtxOptions {
    return ctx => {
        ctx.queryCache = useCreation(() => {
            return new QueryCache()
        }, undefined)
    }
}
