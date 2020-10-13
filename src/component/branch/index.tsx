/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useCallback} from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid, Fab,
} from "@material-ui/core";
import {useStyles} from "./useStyles";
import {useI18n} from "./useI18n";
import {useQueryBranchInfo} from "../../useHook/useQueryCache";
import { Switch, Route, useHistory } from "react-router-dom";
import {displayMS} from "../../util/displayTimer";
import AddIcon from "@material-ui/icons/Add";
import EnvList from "./env_list";
import EnvCreate from "./env_create";

export default function BranchInfoPage() {
    const klass = useStyles()
    const t = useI18n()
    const history = useHistory()
    const { isLoading, isError, isSuccess, error, data: branch } = useQueryBranchInfo()
    
    const onEnvFabAddClick = useCallback(() => {
        history.push('/env')
    }, [])
    
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
        <>
            <Grid container spacing={3}>
                <Grid item xl={9} lg={8} xs={6}>
                    <Switch>
                        <Route path="/env" extract>
                            <EnvCreate/>
                        </Route>
                        <Route>
                            <EnvList/>
                        </Route>
                    </Switch>
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
            <Fab onClick={onEnvFabAddClick} color="primary" aria-label="add" className={klass.envFabAdd}>
                <AddIcon />
            </Fab>
        </>
    )
}
