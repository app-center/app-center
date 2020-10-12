/**
 * Created by samhwang1990@gmail.com.
 */
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import {IEnvInfo} from "../../../domain/model/EnvInfo";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    FormControlLabel,
    IconButton,
    Step,
    StepButton,
    Stepper,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useFormik} from 'formik';
import {FormikHelpers} from "formik/dist/types";
import {useI18n} from "./useI18n";
import {useLocales} from "../../.locales";
import {useUploader} from "./useUploader";
import {formatNumber} from "../../../util/displayNumber";
import ResponseCode from "../../../constant/ResponseCode";
import {useVersionService} from "../../../useHook/useDomain";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";

const VersionReleasePage: React.FC<IVersionReleaseProps> = ({
    envInfo,
}) => {
    const t = useI18n()
    const appTrans = useLocales()
    const [step, updateStep] = useState<EStep>(EStep.INFO)
    const versionService = useVersionService()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    const {
        onUpload: onUploadPackage,
        onReset: onResetPackage,
        state: puState,
        file: puFile,
        uploadResponse: puResponse,
    } = useUploader()
    
    const {
        handleChange,
        setFieldValue: setField,
        handleSubmit,
        values,
        errors,
    } = useFormik<IReleaseFields>({
        initialValues: {
            appVersion: "",
            compatAppVersion: "",
            mustUpdate: false,
            packageKey: "",
            changelog: "",
        },
        async onSubmit (values: IReleaseFields, helpers: FormikHelpers<IReleaseFields>) {
            const res = await versionService.releaseVersion({
                envId: envInfo.id,
                appVersion: values.appVersion,
                compatAppVersion: values.compatAppVersion,
                mustUpdate: values.mustUpdate,
                changelog: values.changelog,
                packageFileKey: values.packageKey
            })
            
            if (res.code === ResponseCode.S_OK) {
                enqueueSnackbar("发布成功", {
                    variant: "success"
                })
                history.push(`/env/${envInfo.id}`)
            } else {
                enqueueSnackbar("发布失败", {
                    variant: "error"
                })
            }
        },
        validate(values) {
        
        },
        validateOnBlur: true,
    })
    
    const isInfoStepComplete = useMemo<boolean>(() => {
        if (!values.appVersion || !!errors.appVersion) return false
        if (!!values.compatAppVersion && !!errors.compatAppVersion) return false
        return true
    }, [
        values.appVersion, values.compatAppVersion,
        errors.appVersion, errors.compatAppVersion,
    ])
    
    const isChangelogStepComplete = useMemo<boolean>(() => {
        return !!values.changelog && !errors.changelog
    }, [values.changelog, errors.changelog])
    
    const isPackageKeyStepComplete = useMemo(() => {
        return !!values.packageKey && !errors.packageKey
    }, [values.packageKey, errors.packageKey])
    
    const isReleaseReady = useMemo(() => {
        return isInfoStepComplete && isChangelogStepComplete && isPackageKeyStepComplete
    }, [isInfoStepComplete, isChangelogStepComplete, isPackageKeyStepComplete])
    
    const isStepBackDisabled = useMemo(() => {
        return step <= 0
    }, [step])
    
    const isStepNextDisabled = useMemo(() => {
        return step >= 2
    }, [step])
    
    const onPackageInputChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const res = await onUploadPackage(e)
        if (res.code === ResponseCode.S_OK) {
            setField('packageKey', res.data)
        }
    }, [])
    
    const onPackageResetClick = useCallback(() => {
        onResetPackage()
    }, [])
    
    const onStepToggle = (step: EStep) => () => {
        updateStep(step)
    }
    
    const onStepBack = (step: EStep) => () => {
        if (step <= 0) return
        updateStep(step - 1)
    }
    
    const onStepNext = (step: EStep) => () => {
        if (step >= 2) return
        updateStep(step + 1)
    }
    
    return (
        <Box p={2} width="100%">
            <Card>
                <CardHeader
                    title={appTrans('txt__release_version', '版本发布')}
                />
                <CardContent>
                    <Stepper nonLinear activeStep={step}>
                        <Step key={EStep.INFO} onClick={onStepToggle(EStep.INFO)} completed={isInfoStepComplete}>
                            <StepButton>{t('lbl__step_info', '基础信息')}</StepButton>
                        </Step>
                        <Step key={EStep.CHANGELOG} onClick={onStepToggle(EStep.CHANGELOG)} completed={isChangelogStepComplete}>
                            <StepButton>{t('lbl__step_changelog', '更新日志')}</StepButton>
                        </Step>
                        <Step key={EStep.PACKAGE} onClick={onStepToggle(EStep.PACKAGE)} completed={isPackageKeyStepComplete}>
                            <StepButton>{t('lbl__step_package', '上传资源包')}</StepButton>
                        </Step>
                    </Stepper>
                    <Box mx={4} clone>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            {step === EStep.INFO && <>
                                <Box minWidth={.3} maxWidth={300}>
                                    <TextField
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin={"normal"}
                                        fullWidth
                                        required
                                        name='appVersion'
                                        value={values.appVersion}
                                        onChange={handleChange}
                                        error={!!errors.appVersion}
                                        label={t('lbl__app_version', '版本号')}
                                        placeholder={t('ph__app_version', '版本号')}
                                    />
                                </Box>
                                <Box minWidth={.3} maxWidth={300}>
                                    <TextField
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin={"normal"}
                                        fullWidth
                                        name='compatAppVersion'
                                        value={values.compatAppVersion}
                                        onChange={handleChange}
                                        error={!!errors.compatAppVersion}
                                        label={t('lbl__compat_app_version', '兼容版本号')}
                                        placeholder={t('ph__compat_app_version', '兼容版本号')}
                                    />
                                </Box>
                                <Box >
                                    <FormControlLabel
                                        control={(
                                            <Switch
                                                id="inp__must_update"
                                                name="mustUpdate"
                                                checked={values.mustUpdate}
                                                onChange={handleChange}
                                                color="primary"
                                            />
                                        )}
                                        label={t('lbl__must_update', '强制更新')}
                                    />
                                </Box>
                            </>}
                            {step === EStep.CHANGELOG && <>
                                <Box>
                                    <TextField
                                        multiline
                                        rows={10}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin={"normal"}
                                        fullWidth
                                        required
                                        name='changelog'
                                        value={values.changelog}
                                        onChange={handleChange}
                                        error={!!errors.changelog}
                                        label={t('lbl__changelog', '更新日志')}
                                        placeholder={t('ph__changelog', '请输入更新日志')}
                                    />
                                </Box>
                            </>}
                            {step === EStep.PACKAGE && <>
                                <Box mt={2}>
                                    <Box clone display="none">
                                        <input
                                            accept="*"
                                            id="release_version__upload_package_file"
                                            type="file"
                                            onChange={onPackageInputChange}
                                        />
                                    </Box>
                                    <label htmlFor="release_version__upload_package_file">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                            disabled={!!puFile}
                                        >
                                            {t('btn__upload_package', '选择文件')}
                                        </Button>
                                    </label>
                                    <Box mt={2} height={40} display="flex" alignItems="center">
                                        {!puFile && <>
                                            <Typography variant="body2" component="span" color="textSecondary">
                                                {t('ph__package', '请选择资源包')}
                                            </Typography>
                                        </>}
                                        {!!puFile && <>
                                            <Box display="flex" alignItems="center">
                                                <Typography
                                                    variant="body2"
                                                    color={puResponse && puResponse.code !== ResponseCode.S_OK ? 'error' : 'textPrimary'}
                                                >
                                                    {puFile.name} ({formatNumber(puFile.size)})
                                                </Typography>
                                                <Box ml={1}>
                                                    {props => <>
                                                        {puState === 'ing' && (
                                                            <CircularProgress {...props} size="2em" />
                                                        )}
                                                        {puState === 'idle' && (
                                                            <IconButton {...props} onClick={onPackageResetClick}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        )}
                                                    </>}
                                                </Box>
                                            </Box>
                                        </>}
                                    </Box>
                                </Box>
                            </>}
                            <Box mt={4}>
                                <Box mr={2} clone>
                                    <Button size="small" variant="text" disabled={isStepBackDisabled} onClick={onStepBack(step)}>
                                        {t('btn__step_back', '返回')}
                                    </Button>
                                </Box>
                                <Button size="small" variant="contained" disabled={isStepNextDisabled} color="primary" onClick={onStepNext(step)}>
                                    {t('btn__step_next', '下一步')}
                                </Button>
                                <Box ml={1} clone>
                                    <Button size="small" type="submit" variant="contained" color="primary" disabled={!isReleaseReady}>
                                        {t('btn__release', '发布')}
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default VersionReleasePage

interface IVersionReleaseProps {
    envInfo: IEnvInfo;
}

interface IReleaseFields {
    appVersion: string;
    compatAppVersion: string;
    mustUpdate: boolean;
    packageKey: string;
    changelog: string;
}

enum EStep {
    INFO,
    CHANGELOG,
    PACKAGE,
}
