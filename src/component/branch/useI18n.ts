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
    
    lbl__env_list: 'Environments',
    
    lbl__env_id: 'Environment ID',
    lbl__env_enc_token: 'Access Token',
    lbl__env_create_at: 'Create At',
    
    lbl__env_create__title: 'Create environment',
    lbl__env_create__name: 'Name',
    
    ph__env_create__name: 'name',
    
    btn__env_create: 'Create',
    
    txt__query_fail: 'Failed to fetch branch info: {{code}}',
    txt__env_create_success: 'Environment created',
    txt__env_create_fail: 'Failed to create environment',
}))

export function useI18n(): TFunction {
    const { t } = useTranslation(ns__branch, {useSuspense: false})
    
    return t
}
