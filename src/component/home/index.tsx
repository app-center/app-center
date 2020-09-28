/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ns__home} from "../../constant/I18n";
import {useHistory} from "react-router-dom";
import {useAccountService} from "../../useHook/useDomain";
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
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

useEnResource(ns__home, () => Promise.resolve({
    btn__ok: 'Confirm',
    btn__logout: 'Logout',
    dialog__authorization_expired: 'The login of this account has expired',
}))

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        breadCrumbs: {
            color: theme.palette.info.contrastText,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: 0,
        },
    }
})

const HomePage: React.FC = (props) => {
    const klass = useStyles()
    const {t, ready} = useTranslation(ns__home, {useSuspense: false})
    const history = useHistory()
    const accountService = useAccountService()
    
    const [unAuthorizedDialog, toggleUnAuthorizedDialog] = useState(false)
    const [drawerOpen, toggleDrawer] = useState(false)
    
    const redirectToLogin = useCallback(() => {
        history.push('/login', {
            from: history.location
        });
    }, [history])
    
    const onCloseUnAuthorizedDialog = useCallback(() => {
        redirectToLogin()
    }, [redirectToLogin])
    
    const onCloseDrawer = useCallback(() => {
        toggleDrawer(false)
    }, [])
    
    const onToggleDrawer = () => {
        toggleDrawer(function (open) {
            return !open
        })
    }
    
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
            {ready && (
                <div className={klass.root}>
                    <AppBar position='fixed' className={klass.appBar}>
                        <Toolbar>
                            <IconButton
                                className={klass.menuButton}
                                onClick={onToggleDrawer}
                                color="inherit"
                                aria-label="menu">
                                {drawerOpen && <ChevronLeftIcon/>}
                                {!drawerOpen && <MenuIcon />}
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
                            [klass.drawerOpen]: drawerOpen,
                            [klass.drawerClose]: !drawerOpen,
                        })}
                        classes={{
                            paper: clsx({
                                [klass.drawerOpen]: drawerOpen,
                                [klass.drawerClose]: !drawerOpen,
                            })
                        }}
                        open={drawerOpen}
                        onClose={onCloseDrawer}>
                        <Toolbar/>
                        <List component="nav" aria-label="Environments"></List>
                    </Drawer>
                    <main className={klass.content}>
                        <Toolbar/>
                        <div>adsiofjasdfaklsdfjkl</div>
                    </main>
                </div>
            )}
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
}

export default HomePage
