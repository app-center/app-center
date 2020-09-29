/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useMemo} from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import {useStyles} from "./useStyles";
import {useI18n} from "./useI18n";
import {useQueryBranchInfo} from "../../useHook/useQueryCache";
import format from 'dayjs'

export default function BranchInfoPage() {
    const klass = useStyles()
    const t = useI18n()
    const { isLoading, isError, error, data: branch } = useQueryBranchInfo()
    
    const displayCreateAt = useMemo(() => {
        if (!branch) return ''
        return format(branch.createAt).format("YYYY-MM-DD HH:mm:ss")
    }, [branch])
    
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
    )
}
