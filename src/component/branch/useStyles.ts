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
        envNameAvatar: {
            textTransform: 'uppercase',
            marginRight: theme.spacing(1),
        },
        envExpanded: {
            marginTop: '0 !important'
        },
        envSummaryExpanded: {
            marginBottom: '0 !important',
        },
        envSummaryContent: {
            alignItems: 'center',
        },
        envDetails: {
            paddingLeft: 40 + theme.spacing(3),
            flexDirection: 'column',
        },
    }
})
