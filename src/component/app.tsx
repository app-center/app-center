/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback, useMemo, useEffect, Suspense, useState} from "react";
import {useLocation, Switch, useHistory, Route, Redirect} from "react-router-dom";
import {useCreation} from "@umijs/hooks";
import {Helmet} from "react-helmet";
import {ThemeProvider} from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import {Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {IClient, newClient} from "../domain/code-push/client";
import {useEnResource, useI18n} from "../useHook/i18n";
import {DomainContext, useAccountService} from "../useHook/useDomain";
import {useTranslation} from "react-i18next";
import { ns__app } from "../constant/I18n";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./.mui/theme";

const LoginPage = React.lazy(() => import('./login'));
const ErrorPage = React.lazy(() => import('./error'));

useEnResource(ns__app, () => Promise.resolve({
    btn__ok: 'Confirm',
    dialog__authorization_expired: 'The login of this account has expired',
}))

const Authorized: React.FC = (props => {
    const {t, ready} = useTranslation(ns__app, {useSuspense: false})
    const history = useHistory()
    const accountService = useAccountService()
    
    const redirectToLogin = useCallback(() => {
        history.push('/login', {
            from: history.location
        });
    }, [])
    
    const [unAuthorizedDialog, toggleUnAuthorizedDialog] = useState(false)
    const onCloseUnAuthorizedDialog = useCallback(() => {
        redirectToLogin()
    }, [redirectToLogin])
    
    useEffect(() => {
        if (!accountService) return
        
        let unsubscribeToAuthorization = accountService.subscribeToUnAuthorized(async function() {
            unsubscribeToAuthorization();
            
            toggleUnAuthorizedDialog(true)
        });
        
        accountService.checkAuthorized().then(async authorized => {
            if (!authorized) {
                await redirectToLogin();
            }
        });
        
        return () => {
            unsubscribeToAuthorization();
        }
    }, [accountService, redirectToLogin]);
    
    return (
        <>
            {ready && props.children}
            {unAuthorizedDialog && (
                <Dialog
                    open={unAuthorizedDialog}
                    onClose={onCloseUnAuthorizedDialog}
                >
                    <DialogContent>
                        <DialogContentText>{t('dialog__authorization_expired', '登录状态过期，需要重新登录')}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseUnAuthorizedDialog} color="primary" autoFocus>
                            {t('btn__ok', '确定')}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
});

const AppCenter: React.FC = () => {
    useI18n();
    
    const location = useLocation();
    
    const routeAuthorized = useMemo(() => {
        const paths = location.pathname.split('/');
        const leadPath = paths[0] === '' ? paths[1] : paths[0]
        return leadPath !== 'login' && leadPath !== '404';
    }, [location]);
    
    const service = useCreation<IClient>(() => newClient(), []);
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SnackbarProvider
                maxSnack={1}
                variant='info'
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <DomainContext.Provider value={service}>
                    <Helmet>
                        <title>Xiner</title>
                    </Helmet>
                    {
                        routeAuthorized &&
                        <Authorized>
                            <Switch>
                                <Route path='/' exact>
                                    <Skeleton/>
                                </Route>
                                <Route>
                                    <Redirect to="/"/>
                                </Route>
                            </Switch>
                        </Authorized>
                    }
                    {
                        !routeAuthorized &&
                        <Switch>
                            <Route path='/login'>
                                <Suspense fallback={<Skeleton/>}>
                                    <LoginPage />
                                </Suspense>
                            </Route>
                            <Route path='/404'>
                                <Suspense fallback={<Skeleton/>}>
                                    <ErrorPage code={404}/>
                                </Suspense>
                            </Route>
                            <Route>
                                <Redirect to="/login"/>
                            </Route>
                        </Switch>
                    }
                </DomainContext.Provider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default AppCenter;
