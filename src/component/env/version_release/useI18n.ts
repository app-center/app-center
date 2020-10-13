/**
 * Created by samhwang1990@gmail.com.
 */

import {useEnResource} from "../../../useHook/i18n";
import {ns__env__release_version} from "../../../constant/I18n";
import {TFunction} from "i18next";
import {useTranslation} from "react-i18next";

useEnResource(ns__env__release_version, () => Promise.resolve({
    lbl__app_version: 'App Version',
    lbl__compat_app_version: 'Compatible Version',
    lbl__must_update: 'Must update',
    lbl__changelog: 'Changelog',
    lbl__package_upload: 'Upload Package',
    
    ph__app_version: 'app version',
    ph__compat_app_version: 'compatible version',
    ph__changelog: 'changelog',
    ph__package: 'Please choose package',
    
    btn__upload_package: 'Select file',
    btn__release: 'Release',
    btn__step_back: 'Back',
    btn__step_next: 'Next',
    
    lbl__step_info: 'Info',
    lbl__step_changelog: 'Changelog',
    lbl__step_package: 'Upload Package',
    
    txt__release_success: 'Release completed',
    txt__release_fail: 'Release failed',
    
}))

export function useI18n(): TFunction {
    const { t } = useTranslation(ns__env__release_version, {useSuspense: false})
    
    return t
}
