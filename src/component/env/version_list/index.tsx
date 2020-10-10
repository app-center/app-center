/**
 * Created by samhwang1990@gmail.com.
 */
import React from "react";
import {useQueryVersionList} from "../../../useHook/useQueryCache";
import {IEnvInfo} from "../../../domain/model/EnvInfo";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@material-ui/core";
import {IVersionInfo} from "../../../domain/model/VersionInfo";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {displayMS} from "../../../util/displayTimer";

interface IVersionListProps {
    envInfo: IEnvInfo;
}

const VersionList: React.FC<IVersionListProps> = ({
    envInfo
}) => {
    const { isSuccess, data: versionList = [] } = useQueryVersionList(envInfo.id)
    
    return (
        <>
            {isSuccess && (
                <>
                    <Box p={2} width="100%">
                        <Typography color="textSecondary">
                            版本列表
                        </Typography>
                        <Typography variant="h5">
                            {versionList.length}
                        </Typography>
                    </Box>
                    <Box mt={2} width="100%">
                        {versionList.map((ver: IVersionInfo, i) => {
                            return (
                                <Accordion key={ver.appVersion}>
                                    <AccordionSummary>
                                        <Box flexBasis='33.33%' display='flex'>
                                            <Typography color="textSecondary">版本：</Typography>
                                            <Typography>{ver.appVersion}</Typography>
                                        </Box>
                                        <Box flexGrow={1} display='flex'>
                                            <Typography color="textSecondary">兼容版本：</Typography>
                                            <Typography>{ver.compatAppVersion}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box flexBasis='33.33%' display='flex'/>
                                        <Box flexGrow={1} display='flex' flexDirection="column">
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography color="textSecondary">必须更新：</Typography>
                                                {ver.mustUpdate ? <CheckIcon/> : <ClearIcon/>}
                                            </Box>
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography component="span" color="textSecondary">资源包 ID：</Typography>
                                                {ver.packageFileKey}
                                            </Box>
                                            <Box display='flex' alignItems="center" pb={1}>
                                                <Typography component="span" color="textSecondary">发布日期：</Typography>
                                                {displayMS(ver.publishAt)}
                                            </Box>
                                            <Box display='flex' alignItems="center">
                                                <Typography component="span" color="textSecondary">更新日志：</Typography>
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
