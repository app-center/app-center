/**
 * Created by samhwang1990@gmail.com.
 */
import React, {useMemo} from "react";
import {Box, Button, Card, CardContent, CardHeader, TextField} from "@material-ui/core";
import {useI18n} from "./useI18n";
import {useFormik} from "formik";
import { useHistory } from 'react-router-dom'
import {useEnvService} from "../../useHook/useDomain";
import ResponseCode from "../../constant/ResponseCode";
import {useSnackbar} from "notistack";

const EnvCreate: React.FC = () => {
    const t = useI18n()
    const envService = useEnvService()
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    
    const {
        handleSubmit,
        values,
        handleChange,
        errors,
    } = useFormik<ICreateFields>({
        initialValues: {
            name: '',
            encToken: '',
        },
        async onSubmit(values: ICreateFields) {
            const res = await envService.createEnv({
                name: values.name,
                encToken: values.encToken,
            })
            
            if (res.code === ResponseCode.S_OK) {
                enqueueSnackbar(t('txt__env_create_success', "创建成功"), {
                    variant: "success"
                })
                history.push('/')
            } else {
                enqueueSnackbar(t('txt__env_create_fail', "创建失败"), {
                    variant: "error"
                })
            }
        },
        validateOnBlur: true,
    })
    
    const isCreateReady = useMemo(() => {
        if (!values.name || !!errors.name) return false
        
        return true
    }, [values.name, errors.name])
    
    return (
        <Box px={2} width={1}>
            <Card>
                <CardHeader
                    title={t('lbl__env_create__title', '创建环境')}
                />
                <CardContent>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin={"normal"}
                            fullWidth
                            required
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            label={t('lbl__env_create__name', '环境名')}
                            placeholder={t('ph__env_create__name', '环境名')}
                        />
                        <TextField
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin={"normal"}
                            fullWidth
                            name='encToken'
                            value={values.encToken}
                            onChange={handleChange}
                            error={!!errors.encToken}
                            label={t('lbl__env_create__enc_token', '访问密钥')}
                            placeholder={t('ph__env_create__enc_token', '访问密钥')}
                        />
                        <Box mt={2}>
                            <Button size="small" type="submit" variant="contained" color="primary" disabled={!isCreateReady}>
                                {t('btn__env_create', '创建')}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default EnvCreate

interface ICreateFields {
    name: string;
    encToken: string;
}
