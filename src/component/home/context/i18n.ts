/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */
import {TFunction} from "i18next";
import {IHomeCtxOptions} from "./index";
import {UseTranslationResponse} from "react-i18next";

declare module "./index" {
    interface IHomeCtx {
        t: TFunction;
        tReady: boolean;
    }
}

export function withI18n(res: UseTranslationResponse): IHomeCtxOptions {
    return {
        useContext(ctx) {
            ctx.t = res.t;
            ctx.tReady = res.ready
        }
    }
}
