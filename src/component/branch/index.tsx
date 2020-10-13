/**
 * Created by samhwang1990@gmail.com.
 */

import React from "react";
import {
    Card,
    CardContent,
    Paper,
    Divider,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    Grid, ListItemText, Box,
} from "@material-ui/core";
import {useStyles} from "./useStyles";
import {useI18n} from "./useI18n";
import {useQueryBranchInfo, useQueryEnvList} from "../../useHook/useQueryCache";
import { useHistory } from "react-router-dom";
import {IEnvInfo} from "../../domain/model/EnvInfo";
import {displayMS} from "../../util/displayTimer";

export default function BranchInfoPage() {
    const klass = useStyles()
    const t = useI18n()
    const history = useHistory()
    const { isLoading, isError, isSuccess, error, data: branch } = useQueryBranchInfo()
    const { data: envList = [] } = useQueryEnvList({
        enabled: isSuccess
    });
    
    const onEnvItemClick = (id: string) => () => {
        history.push(`/env/${id}`)
    }
    
    if (isLoading) {
        return <></>
    }
    
    if (isError) {
        return (
            <Typography color="textPrimary">
                {t('txt__query_fail', '分支信息加载失败：{{code}}', {code: error})}
            </Typography>
        )
    }
    
    return (
        <Grid container spacing={3}>
            <Grid item xl={9} lg={8} xs={6}>
                <Paper className={klass.envs}>
                    <Box p={2}>
                        <Typography color="textSecondary">
                            {t('lbl__env_list', '分支列表')}
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
            </Grid>
            <Grid item xl={3} lg={4} xs={6}>
                <Card className={klass.card}>
                    <CardContent>
                        <Typography color="textSecondary">
                            {t('lbl__branch_name', '分支名')}
                        </Typography>
                        <Typography variant="h5" gutterBottom >
                            {branch.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {t('lbl__branch_create_at', '创建日期')}
                        </Typography>
                        <Typography variant="h5">
                            {displayMS(branch.createAt)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
