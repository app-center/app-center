/**
 * Created by samhwang1990@gmail.com.
 */
import {IEnvCtxOptions} from "./index";
import { useParams } from "react-router-dom";

declare module './index' {
    interface IEnvCtx {
        envId: string;
    }
}

export function withEnvId(): IEnvCtxOptions {
    return (ctx) => {
        const {envId} = useParams()
        
        ctx.envId = envId
    }
}
