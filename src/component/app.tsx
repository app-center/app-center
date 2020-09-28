/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback, useMemo, useEffect, Suspense} from "react";
import {useLocation, Switch, useHistory, Route, Redirect} from "react-router-dom";
import {useCreation} from "@umijs/hooks";
import {Helmet} from "react-helmet";
import {ThemeProvider} from '@material-ui/core/styles';
import {Skeleton} from "@material-ui/lab";
import {IClient, newClient} from "../domain/code-push/client";
import {useI18n} from "../useHook/i18n";
import { DomainContext } from "../useHook/useDomain";
import {useTranslation} from "react-i18next";
import { ns__app } from "../constant/I18n";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./.mui/theme";
import { SnackbarProvider } from 'notistack';

const LoginPage = React.lazy(() => import('./login'));
const ErrorPage = React.lazy(() => import('./error'));

const Authorized: React.FC = (props => {
    const {t, ready} = useTranslation(ns__app, {useSuspense: false});
    const history = useHistory();
    
    const redirectToLogin = useCallback(async () => {
        history.push('/login', {
            from: history.location
        });
    }, [history]);
    
    useEffect(() => {
        return () => {
        }
    }, []);
    
    return (
        <>
            {ready && props.children}
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
