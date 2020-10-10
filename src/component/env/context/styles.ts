/**
 * Created by samhwang1990@gmail.com.
 */

import {makeStyles} from "@material-ui/core/styles";
import {IEnvCtxOptions} from "./index";

const useStyles = makeStyles((theme) => {
    return {
        card: {
            width: "100%",
        },
        fabAdd: {
            position: "absolute",
            right: theme.spacing(3),
            bottom: theme.spacing(3),
        },
    }
})

declare module './index' {
    interface IEnvCtx {
        klass: ReturnType<typeof useStyles>
    }
}

export function withStyles(): IEnvCtxOptions {
    return {
        useContext(ctx) {
            ctx.klass = useStyles()
        }
    }
}
