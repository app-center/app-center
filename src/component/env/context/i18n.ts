/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource} from "../../../useHook/i18n";
import {ns__env} from "../../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";
import {IEnvCtxOptions} from "./index";

useEnResource(ns__env, () => Promise.resolve({
    txt__query_fail: 'Failed to fetch env info: {{code}}',
    
    lbl__env_id: 'Environment ID',
    lbl__env_enc_token: 'Access Token',
    lbl__env_create_at: 'Create At',
    
    lbl__env_list: 'Environments',
    
    lbl__ver_list__app_version: 'Version: ',
    lbl__ver_list__compat_app_version: 'Compatible Version: ',
    lbl__ver_list__must_update: 'Must update: ',
    lbl__ver_list__package_key: 'Package Key: ',
    lbl__ver_list__publish_at: 'Publish at: ',
    lbl__ver_list__changelog: 'Changelog: ',
}))

declare module './index' {
    interface IEnvCtx {
        t: TFunction;
    }
}

export function useI18n(): TFunction {
    const { t } = useTranslation(ns__env, {useSuspense: false})
    return t
}

export function withI18n(): IEnvCtxOptions {
    return ctx => {
        ctx.t = useI18n()
    }
}
