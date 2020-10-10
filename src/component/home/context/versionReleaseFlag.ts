/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import {useRouteMatch} from "react-router-dom";

declare module './index' {
    interface IHomeCtx {
        versionReleaseFlag: boolean;
    }
}

export function withVersionReleaseFlag(): IHomeCtxOptions {
    return ctx => {
        const match = useRouteMatch<{
            envId: string
        }>("/env/:envId/version/release");
        
        ctx.versionReleaseFlag = match != null
    }
}
