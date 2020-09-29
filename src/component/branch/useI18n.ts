/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource} from "../../useHook/i18n";
import {ns__branch} from "../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";

useEnResource(ns__branch, () => Promise.resolve({
    lbl__branch_name: 'Branch Name',
    lbl__branch_create_at: 'Create At',
    
    txt__query_fail: 'Failed to fetch branch info: {{code}}'
}))

export function useI18n(): TFunction {
    const { t } = useTranslation(ns__branch, {useSuspense: false})
    
    return t
}
