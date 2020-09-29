/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback, useEffect} from "react";
import {ns__home} from "../../constant/I18n";
import {useHistory, Switch, Route} from "react-router-dom";
import {useBranchService} from "../../useHook/useDomain";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    AppBar,
    Drawer,
    Toolbar, IconButton, Typography, List, Breadcrumbs, Link
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {useEnResource} from "../../useHook/i18n";
import {withStyles} from "./context/styles";
import clsx from "clsx";
import {useCtx} from "../../util/useCtx";
import {IHomeCtx} from "./context";
import {withI18n} from "./context/i18n";
import {withUnAuthorizedFlag} from "./context/unAuthorizedFlag";
import {withDrawerOpenFlag} from "./context/drawerOpenFlag";
import {withQueryCache} from "./context/queryCache";
import { ReactQueryCacheProvider } from "react-query";
import BranchInfoPage from "../branch";

useEnResource(ns__home, () => Promise.resolve({
    btn__ok: 'Confirm',
    btn__logout: 'Logout',
    dialog__authorization_expired: 'The login of this account has expired',
}))

const HomePage: React.FC = (props) => {
    const context = useCtx<IHomeCtx>()
    
    context.withContext(
        withStyles(),
        withI18n(),
        withUnAuthorizedFlag(),
        withDrawerOpenFlag(),
        withQueryCache(),
    )
    
    const ctx = context.useContext()
    const {
        klass,
        t, tReady: ready,
        unAuthorizedFlag,
        drawerOpenFlag,
    } = ctx
    
    const history = useHistory()
    const branchService = useBranchService()
    
    const redirectToLogin = () => {
        history.push('/login', {
            from: history.location
        });
    }
    
    const onCloseUnAuthorizedDialog = useCallback(() => {
        redirectToLogin()
    }, [])
    
    const onCloseDrawer = useCallback(() => {
        ctx.toggleDrawerOpenFlag(false)
    }, [])
    
    const onToggleDrawer = useCallback(() => {
        ctx.toggleDrawerOpenFlag(function (open) {
            return !open
        })
    }, [])
    
    useEffect(() => {
        if (!branchService) return
        
        let unsubscribeToAuthorization = branchService.subscribeToUnAuthorized(async function() {
            unsubscribeToAuthorization();
            
            ctx.toggleUnAuthorizedFlag(true)
        });
    
        branchService.checkAuthorized().then(async authorized => {
            if (!authorized) {
                await redirectToLogin();
            }
        });
        
        return () => {
            unsubscribeToAuthorization();
        }
    }, [branchService]);
    
    return (
        <ReactQueryCacheProvider queryCache={ctx.queryCache}>
            {ready && (
                <div className={klass.root}>
                    <AppBar position='fixed' className={klass.appBar}>
                        <Toolbar>
                            <IconButton
                                className={klass.menuButton}
                                onClick={onToggleDrawer}
                                color="inherit"
                                aria-label="menu">
                                {drawerOpenFlag && <ChevronLeftIcon/>}
                                {!drawerOpenFlag && <MenuIcon />}
                            </IconButton>
                            <div className={klass.title}>
                                <Breadcrumbs aria-label="breadcrumb" className={klass.breadCrumbs}>
                                    <Link color="inherit" href="/">
                                        <Typography variant="h6">
                                            AppCenter
                                        </Typography>
                                    </Link>
                                    <Link color="inherit" href="/getting-started/installation/">
                                        Core
                                    </Link>
                                </Breadcrumbs>
                            </div>
                            <Button size='large' color="inherit">
                                {t('btn__logout','退出')}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant='permanent'
                        className={clsx(klass.drawer, {
                            [klass.drawerOpen]: drawerOpenFlag,
                            [klass.drawerClose]: !drawerOpenFlag,
                        })}
                        classes={{
                            paper: clsx({
                                [klass.drawerOpen]: drawerOpenFlag,
                                [klass.drawerClose]: !drawerOpenFlag,
                            })
                        }}
                        open={drawerOpenFlag}
                        onClose={onCloseDrawer}>
                        <Toolbar/>
                        <List component="nav" aria-label="Environments"></List>
                    </Drawer>
                    <main className={klass.content}>
                        <Toolbar/>
                        <Switch>
                            <Route path='/' exact>
                                <BranchInfoPage/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            )}
            <Dialog
                open={unAuthorizedFlag}
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
        </ReactQueryCacheProvider>
    )
}

export default HomePage
