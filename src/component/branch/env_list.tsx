/**
 * Created by samhwang1990@gmail.com.
 */
import React from "react";
import {useQueryEnvList} from "../../useHook/useQueryCache";
import {useHistory} from "react-router-dom";
import {useI18n} from "./useI18n";
import {useStyles} from "./useStyles";
import {Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {IEnvInfo} from "../../domain/model/EnvInfo";
import {displayMS} from "../../util/displayTimer";

const EnvList: React.FC<IEnvListProps> = ({
}) => {
    const history = useHistory()
    const t = useI18n()
    const klass = useStyles()
    
    const { isSuccess, data: envList = [] } = useQueryEnvList();
    
    const onEnvItemClick = (id: string) => () => {
        history.push(`/env/${id}`)
    }
    
    return (
        <>
            {isSuccess && <>
                <Paper className={klass.envs}>
                    <Box p={2}>
                        <Typography color="textSecondary">
                            {t('lbl__env_list', '环境列表')}
                        </Typography>
                        <Typography variant="h5">
                            {envList.length}
                        </Typography>
                    </Box>
                    <Divider/>
                    <List component="nav" aria-label="environments">
                        {envList.map((env: IEnvInfo, i) => {
                            return (
                                <div key={env.id}>
                                    {i >= 1 && <Divider variant="inset" component="div"/>}
                                    <ListItem alignItems="flex-start" onClick={onEnvItemClick(env.id)} button>
                                        <ListItemAvatar>
                                            <Avatar alt={env.name} className={klass.envNameAvatar}>{env.name[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {env.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {t('lbl__env_id', '环境 ID')}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                {env.id}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {t('lbl__env_enc_token', '访问密钥')}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                {env.encToken}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {t('lbl__env_create_at', '创建日期')}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {displayMS(env.createAt)}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </div>
                            )
                        })}
                    </List>
                </Paper>
            </>}
        </>
    )
}

export default EnvList

interface IEnvListProps {
}
