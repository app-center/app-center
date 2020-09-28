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
            margin: '1em',
            justifyContent: 'center',
        },
        hint: {
            display: 'flex',
            marginTop: '1em',
            justifyContent: 'center',
            color: theme.palette.text.secondary,
        },
        input: {
            padding: theme.spacing(2, 3),
        },
        action: {
            padding: theme.spacing(2, 3),
        }
    }
})
