/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource} from "../../../useHook/i18n";
import {ns__login} from "../../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";

useEnResource(ns__login, () => import('./en'));

export function useLocales(): TFunction {
    const {t} = useTranslation(ns__login);
    
    return t;
}
