/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource} from "../../../useHook/i18n";
import {ns__env} from "../../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";
import {IEnvCtxOptions} from "./index";

useEnResource(ns__env, () => Promise.resolve({
    txt__query_fail: 'Failed to fetch env info: {{code}}'
}))

declare module './index' {
    interface IEnvCtx {
        t: TFunction;
    }
}

export function withI18n(): IEnvCtxOptions {
    return ctx => {
        const { t } = useTranslation(ns__env, {useSuspense: false})
    
        ctx.t = t
    }
}
