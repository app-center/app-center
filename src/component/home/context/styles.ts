/**
 * Created by samhwang1990@gmail.com.
 */

import {makeStyles} from "@material-ui/core/styles";
import {IHomeCtxOptions} from "./index";

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
        envNameAvatar: {
            textTransform: 'uppercase',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: 0,
        },
    }
})

declare module './index' {
    interface IHomeCtx {
        klass: ReturnType<typeof useStyles>
    }
}

export function withStyles(): IHomeCtxOptions {
    return {
        useContext(ctx) {
            ctx.klass = useStyles()
        }
    }
}
