/**
 * Created by samhwang1990@gmail.com.
 */
import {IHomeCtxOptions} from "./index";
import {useState} from "react";

declare module './index' {
    interface IHomeCtx {
        unAuthorizedFlag: boolean;
        toggleUnAuthorizedFlag: (flag: boolean) => void
    }
}

export function withUnAuthorizedFlag(): IHomeCtxOptions {
    return (ctx) => {
        const [flag, updateFlag] = useState(false);
        ctx.unAuthorizedFlag = flag
        ctx.toggleUnAuthorizedFlag = updateFlag
    }
}
