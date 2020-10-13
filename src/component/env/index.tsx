/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useCallback} from "react";
import {Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import {useCtx} from "../../util/useCtx";
import {IEnvCtx} from "./context";
import {withEnvId} from "./context/envId";
import {withEnvInfo} from "./context/envInfo";
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Fab
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {withI18n} from "./context/i18n";
import {withStyles} from "./context/styles";
import {displayMS} from "../../util/displayTimer";
import VersionRelease from "./version_release";
import VersionList from "./version_list";

const EnvPage: React.FC = () => {
    const context = useCtx<IEnvCtx>()
    const {path, url} = useRouteMatch()
    const history = useHistory()
    
    context.withContext(
        withStyles(),
        withEnvId(),
        withI18n(),
        withEnvInfo(),
    )
    
    const ctx = context.useContext()
    
    const {
        t,
        klass,
        isEnvInfoFetching,
        isEnvInfoFetchFailed,
        envInfoFetchError,
        envInfo,
    } = ctx
    
    const onFabAddIconClick = useCallback(() => {
        history.push(`${url}/version/release`)
    }, [url])
    
    if (isEnvInfoFetching) return <></>
    
    if (isEnvInfoFetchFailed) {
        return (
            <Typography color="textPrimary">
                {t('txt__query_fail', '环境信息加载失败：{{code}}', {code: envInfoFetchError})}
            </Typography>
        )
    }
    
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xl={9} lg={8} xs={6}>
                    <Switch>
                        <Route path={`${path}/version/release`} exact>
                            <VersionRelease envInfo={envInfo}/>
                        </Route>
                        <Route>
                            <VersionList envInfo={envInfo}/>
                        </Route>
                    </Switch>
                </Grid>
                
                <Grid item xl={3} lg={4} xs={6}>
                    <Card className={klass.card}>
                        <CardContent>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {envInfo.name}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {t('lbl__env_id', '环境 ID')}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {envInfo.id}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {t('lbl__env_enc_token', '访问密钥')}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {envInfo.encToken}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {t('lbl__env_create_at', '创建日期')}
                            </Typography>
                            <Typography variant="h6">
                                {displayMS(envInfo.createAt)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Fab onClick={onFabAddIconClick} color="primary" aria-label="add" className={klass.fabAdd}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default EnvPage
