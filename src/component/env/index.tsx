/**
 * Created by samhwang1990@gmail.com.
 */
import React from "react";
import {useCtx} from "../../util/useCtx";
import {IEnvCtx} from "./context";
import {withEnvId} from "./context/envId";

const EnvPage: React.FC = () => {
    const context = useCtx<IEnvCtx>()
    
    context.withContext(
        withEnvId(),
    )
    
    const ctx = context.useContext()
    
    return (
        <div>
            {ctx.envId}
        </div>
    )
}

export default EnvPage
