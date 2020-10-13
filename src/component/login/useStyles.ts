/**
 * Created by samhwang1990@gmail.com.
 */

import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
    return {
        wrapper: {
            minHeight: '100vh',
        },
        card: {
            minWidth: 300,
        },
        header: {
            display: 'flex',
            paddingTop: theme.spacing(2),
            justifyContent: 'center',
            fontSize: theme.typography.h3.fontSize,
        },
        hint: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: theme.spacing(1),
            color: theme.palette.text.secondary,
            fontSize: theme.typography.h4.fontSize,
        },
        input: {
            padding: theme.spacing(2, 3),
        },
        action: {
            padding: theme.spacing(2, 3),
        }
    }
})
