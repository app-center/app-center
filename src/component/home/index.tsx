/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback, useEffect} from "react";
import {ns__home} from "../../constant/I18n";
import {Route, Switch, useHistory, Link as RouterLink} from "react-router-dom";
import {useBranchService} from "../../useHook/useDomain";
import {
    AppBar, Avatar,
    Breadcrumbs,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    Toolbar,
    Typography
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
import {ReactQueryCacheProvider} from "react-query";
import BranchInfoPage from "../branch";
import EnvInfoPage from '../env'
import ResponseCode from "../../constant/ResponseCode";
import {useQueryEnvList} from "../../useHook/useQueryCache";
import {withSelectedEnv} from "./context/selectedEnv";
import {withBreadCrumbItems} from "./context/breadCrumbItems";

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
        withSelectedEnv(),
        withBreadCrumbItems(),
    )
    
    const ctx = context.useContext()
    const {
        klass,
        t, tReady: ready,
        unAuthorizedFlag,
        drawerOpenFlag,
        selectedEnvId,
        breadCrumbItems,
    } = ctx
    
    const history = useHistory()
    const branchService = useBranchService()
    const {data: envList = []} = useQueryEnvList()
    
    const redirectToLogin = () => {
        history.push('/login');
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
    
    const onLogout = useCallback(async () => {
        const {code} = await branchService.logout()
        if (code === ResponseCode.S_OK) {
            redirectToLogin()
        } else {
        
        }
    }, [branchService])
    
    const onEnvItemClick = (id: string) => () => {
        history.push(`/env/${id}`)
    }
    
    useEffect(() => {
        if (!branchService) return
        
        let unsubscribeToAuthorization = branchService.subscribeToUnAuthorized(async function() {
            unsubscribeToAuthorization();
            
            ctx.toggleUnAuthorizedFlag(true)
        });
    
        branchService.checkAuthorized().then(async authorized => {
            if (!authorized) {
                redirectToLogin();
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
                                edge="start"
                                aria-label="menu">
                                {drawerOpenFlag && <ChevronLeftIcon/>}
                                {!drawerOpenFlag && <MenuIcon />}
                            </IconButton>
                            <div className={klass.title}>
                                <Breadcrumbs aria-label="breadcrumb" className={klass.breadCrumbs}>
                                    {breadCrumbItems.map((item) => {
                                        if (item.link == undefined) {
                                            return <Typography key={item.text} color="inherit" variant={item.variant || 'body1'}>{item.text}</Typography>
                                        } else {
                                            return (
                                                <Link component={RouterLink} color="inherit" key={item.text} to={item.link}>
                                                    <Typography variant={item.variant || 'body1'}>
                                                        {item.text}
                                                    </Typography>
                                                </Link>
                                            )
                                        }
                                    })}
                                </Breadcrumbs>
                            </div>
                            <Button size='large' color="inherit" onClick={onLogout}>
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
                        <List component="nav" aria-label="Environments">
                            {envList.map(env => {
                                return (
                                    <ListItem
                                        onClick={onEnvItemClick(env.id)}
                                        button
                                        selected={env.id === selectedEnvId}
                                        key={env.id}>
                                        <ListItemAvatar>
                                            <Avatar alt={env.name} className={klass.envNameAvatar}>{env.name[0]}</Avatar>
                                        </ListItemAvatar>
                                        <Typography variant="inherit" noWrap>
                                            {env.name}
                                        </Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Drawer>
                    <main className={klass.content}>
                        <Toolbar/>
                        <Switch>
                            <Route path='/' exact>
                                <BranchInfoPage/>
                            </Route>
                            <Route path='/env/:envId'>
                                <EnvInfoPage/>
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
