/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import {useRouteMatch} from "react-router-dom";

declare module './index' {
    interface IHomeCtx {
        envCreationFlag: boolean;
    }
}

export function withEnvCreationFlag(): IHomeCtxOptions {
    return ctx => {
        const match = useRouteMatch({
            path: "/env",
            exact: true,
        });
        
        ctx.envCreationFlag = match != null
    }
}
