/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import {Dispatch, SetStateAction, useState} from "react";

declare module './index' {
    interface IHomeCtx {
        drawerOpenFlag: boolean;
        toggleDrawerOpenFlag: Dispatch<SetStateAction<boolean>>
    }
}

export function withDrawerOpenFlag(): IHomeCtxOptions {
    return (ctx) => {
        const [flag, updateFlag] = useState(false)
        ctx.drawerOpenFlag = flag
        ctx.toggleDrawerOpenFlag = updateFlag
    }
}
