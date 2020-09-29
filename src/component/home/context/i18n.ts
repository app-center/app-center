/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */
import {TFunction} from "i18next";
import {IHomeCtxOptions} from "./index";
import {useTranslation} from "react-i18next";
import {ns__home} from "../../../constant/I18n";

declare module "./index" {
    interface IHomeCtx {
        t: TFunction;
        tReady: boolean;
    }
}

export function withI18n(): IHomeCtxOptions {
    return {
        useContext(ctx) {
            const {t, ready} = useTranslation(ns__home, {useSuspense: false})
            ctx.t = t;
            ctx.tReady = ready
        }
    }
}
