/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource, useZhResource} from "../../useHook/i18n";
import {ns__app} from "../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";

useEnResource(ns__app, () => import('./en'))
useZhResource(ns__app, () => import('./zh'))

export function useLocales(): TFunction {
    const {t} = useTranslation(ns__app, {useSuspense: false})
    
    return t
}
