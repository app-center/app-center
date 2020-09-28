/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useMemo} from "react";
import {ns__error} from "../../constant/I18n";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";
import { useEnResource } from "../../useHook/i18n";

useEnResource(ns__error, () => Promise.resolve({
    title: '{{code}}',
    message: 'Sorry, something wrong happened',
    message__404: 'Sorry, the page you visited does not exist.',
    btn__home: 'Back Home'
}))

interface IErrorPageProps {
    code: number
}

const ErrorPage: React.FC<IErrorPageProps> = ({
    code,
}) => {
    const history = useHistory();
    const {t} = useTranslation(ns__error);
    const message = useMemo<string>(() => {
        switch (code) {
            case 404:
                return t('message__404', '此页面未找到。');
            default:
                return t('message', '页面发生错误。');
        }
    }, [code])
    
    return (
        <div className={styles.wrapper}>
            <Helmet>
                <title>{t('title', '错误 {{code}}', {code})}</title>
            </Helmet>
            <div className={styles.content}>
                {code}
            </div>
        </div>
    )
}

export default ErrorPage;
