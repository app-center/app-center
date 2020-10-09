/**
 * Created by samhwang1990@gmail.com.
 */
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
    return {
        card: {
            width: "100%",
        },
        envs: {
            width: "100%",
        },
        envSize: {
            padding: theme.spacing(2)
        },
        envNameAvatar: {
            textTransform: 'uppercase',
        }
    }
})