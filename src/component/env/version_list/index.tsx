/**
 * Created by samhwang1990@gmail.com.
 */
import React from "react";
import {useQueryVersionList} from "../../../useHook/useQueryCache";
import {IEnvInfo} from "../../../domain/model/EnvInfo";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, Paper, Divider} from "@material-ui/core";
import {IVersionInfo} from "../../../domain/model/VersionInfo";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {displayMS} from "../../../util/displayTimer";
import {useI18n} from "../context/i18n";

interface IVersionListProps {
    envInfo: IEnvInfo;
}

const VersionList: React.FC<IVersionListProps> = ({
    envInfo
}) => {
    const { isSuccess, data: versionList = [] } = useQueryVersionList(envInfo.id)
    const t = useI18n()
    
    return (
        <>
            {isSuccess && (
                <>
                    <Box p={2} mb={2} width="100%" component={Paper}>
                        <Typography color="textSecondary">
                            {t('lbl__env_list', '版本列表')}
                        </Typography>
                        <Typography variant="h5">
                            {versionList.length}
                        </Typography>
                    </Box>
                    <Box width="100%">
                        {versionList.map((ver: IVersionInfo, i) => {
                            return (
                                <Accordion key={ver.appVersion}>
                                    <AccordionSummary>
                                        <Box flexBasis='33.33%' display='flex'>
                                            <Typography color="textSecondary">{t('lbl__ver_list__app_version', '版本：')}</Typography>
                                            <Typography>{ver.appVersion}</Typography>
                                        </Box>
                                        <Box flexGrow={1} display='flex'>
                                            <Typography color="textSecondary">{t('lbl__ver_list__compat_app_version', '兼容版本：')}</Typography>
                                            <Typography>{ver.compatAppVersion}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box flexBasis='33.33%' display='flex'/>
                                        <Box flexGrow={1} display='flex' flexDirection="column">
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography color="textSecondary">
                                                    {t('lbl__ver_list__must_update', '必须更新：')}
                                                </Typography>
                                                {ver.mustUpdate ? <CheckIcon/> : <ClearIcon/>}
                                            </Box>
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography component="span" color="textSecondary">
                                                    {t('lbl__ver_list__package_key', '资源包 ID：')}
                                                </Typography>
                                                {ver.packageFileKey}
                                            </Box>
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography component="span" color="textSecondary">
                                                    {t('lbl__ver_list__publish_at', '发布日期：')}
                                                </Typography>
                                                {displayMS(ver.publishAt)}
                                            </Box>
                                            <Box display='flex' alignItems="center">
                                                <Typography component="span" color="textSecondary">
                                                    {t('lbl__ver_list__changelog', '更新日志：')}
                                                </Typography>
                                                {ver.changelog}
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Box>
                </>
            )}
        </>
    )
}

export default VersionList
