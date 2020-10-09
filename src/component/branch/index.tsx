/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useMemo} from "react";
import {Card, CardContent, Paper, Divider, Typography, List, ListItem, Avatar, ListItemText, ListItemAvatar, Grid, IconButton} from "@material-ui/core";
import {useStyles} from "./useStyles";
import {useI18n} from "./useI18n";
import {useQueryBranchInfo, useQueryEnvList} from "../../useHook/useQueryCache";
import format from 'dayjs'
import { useHistory } from "react-router-dom";

export default function BranchInfoPage() {
    const klass = useStyles()
    const t = useI18n()
    const history = useHistory()
    const { isLoading, isError, isSuccess, error, data: branch } = useQueryBranchInfo()
    const { data: envList = [] } = useQueryEnvList({
        enabled: isSuccess
    });
    
    const displayCreateAt = useMemo(() => {
        if (!branch) return ''
        return format(branch.createAt).format("YYYY-MM-DD HH:mm:ss")
    }, [branch])
    
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
            <Grid item lg={3} xs={6}>
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
                            {displayCreateAt}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={3} xs={6}>
                <Paper className={klass.envs}>
                    <div className={klass.envSize}>
                        <Typography color="textSecondary">
                            {t('lbl__env_list', '分支列表')}
                        </Typography>
                        <Typography variant="h5" >
                            {envList.length}
                        </Typography>
                    </div>
                    <Divider/>
                    <List component="nav" aria-label="environments">
                        {envList.map(env => {
                            return (
                                <ListItem onClick={onEnvItemClick(env.id)} button key={env.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={env.name} className={klass.envNameAvatar}>{env.name[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={env.name} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}
