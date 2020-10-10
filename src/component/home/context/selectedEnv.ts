/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import { useRouteMatch } from "react-router-dom";
import {useQueryEnvInfo} from "../../../useHook/useQueryCache";

declare module './index' {
    interface IHomeCtx {
        selectedEnvId: string;
        selectedEnvName?: string;
    }
}

export function withSelectedEnv(): IHomeCtxOptions {
    return (ctx) => {
        const match = useRouteMatch<{
            envId: string
        }>("/env/:envId");
        
        let selectedEnvId: string
        
        if (match != null) {
            const {envId} = match.params
            selectedEnvId = envId
        }
        
        ctx.selectedEnvId = selectedEnvId
    
        const { isSuccess, data: env } = useQueryEnvInfo(selectedEnvId, {
            enabled: selectedEnvId != null
        })
        
        if (isSuccess) {
            ctx.selectedEnvName = env.name
        }
    }
}
