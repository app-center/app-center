/**
 * Created by samhwang1990@gmail.com.
 */

import {useEffect} from "react";

import i18n, {ResourceKey} from "i18next";
import {initReactI18next, useTranslation} from "react-i18next";

import backend, {generateReadBucketKey, hookRead} from '../util/i18next-backend';
import lngDetector from '../util/i18next-lng-detector';

import {lang__en, lang__zh} from "../constant/I18n";
import dayjs from "dayjs";

i18n
    .use(backend)
    .use(lngDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: lang__zh,
    
        interpolation: {
            escapeValue: false
        },
    })

// @ts-ignored
global.i18n = i18n;

export function useI18n() {
    const {i18n} = useTranslation('', {useSuspense: false});
    
    useEffect(() => {
        if (i18n.language === lang__en) {
            Promise.all([
                import('dayjs/locale/en').then(() => dayjs.locale('en')),
            ])
        } else {
            Promise.all([
                import('dayjs/locale/zh-cn').then(() => dayjs.locale('zh-cn')),
            ])
        }
    }, [i18n.language])
}

export function useEnResource(namespace: string, res: () => Promise<ResourceKey>) {
    useResource(namespace, lang__en, res);
}

export function useZhResource(namespace: string, res: () => Promise<ResourceKey>) {
    useResource(namespace, lang__zh, res);
}

function useResource(namespace: string, lang: string, res: () => Promise<ResourceKey>) {
    hookRead.tapAsync(function (namespace: string, language: string, cb) {
        res().then(resource => {
            if (resource['__esModule'] === true && resource['default']) {
                resource = resource['default'];
            }
            cb(null, resource);
        }, err => {
            cb(err);
        })
    }, generateReadBucketKey(namespace, lang))
}
