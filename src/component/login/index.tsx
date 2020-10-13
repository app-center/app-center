/**
 * Created by samhwang1990@gmail.com.
 */
import React, {ChangeEvent, useCallback, useReducer} from "react"
import {Button, Card, Grid, TextField} from "@material-ui/core"
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import {Helmet} from 'react-helmet'
import {useStyles} from "./useStyles"
import {useLocales} from "./.locales"
import {useDomainContext} from "../../useHook/useDomain";
import ResponseCode from "../../constant/ResponseCode";
import { useSnackbar } from "notistack"
import { useHistory } from "react-router-dom"

const Login: React.FC = () => {
    const klass = useStyles()
    const t = useLocales()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    
    const {authorizationService, branchService} = useDomainContext()
    
    const [{id: branchId, err: branchIdErr, ht: branchIdHt}, updateBranchId] = useReducer<
        (ps: IBranchIdState, action: IBranchIdStateAction) => IBranchIdState
    >((ps, action) => {
        switch (action.type) {
            case "error":
                return {
                    ...ps,
                    err: true,
                    ht: action.payload
                }
            case "updateId":
                return {
                    id: action.payload,
                    err: false,
                    ht: undefined,
                }
            default:
                return ps
        }
    },
        {
            id: '',
            err: false,
            ht: undefined,
        }
    )
    
    const [{token: branchToken, err: branchTokenErr, ht: branchTokenHt}, updateBranchToken] = useReducer<
        (ps: IBranchTokenState, action: IBranchTokenStateAction) => IBranchTokenState
    >((ps, action) => {
            switch (action.type) {
                case "error":
                    return {
                        ...ps,
                        err: true,
                        ht: action.payload
                    }
                case "updateToken":
                    return {
                        token: action.payload,
                        err: false,
                        ht: undefined,
                    }
                default:
                    return ps
            }
        },
        {
            token: '',
            err: false,
            ht: undefined,
        }
    )
    
    const onSignIn = useCallback(async () => {
        if (!branchId || !branchToken) {
            if (!branchId) {
                updateBranchId({
                    type: 'error',
                    payload: t('msg__err__branch_id_required', '分支 ID 不能为空'),
                })
            }
            if (!branchToken) {
                updateBranchToken({
                    type: 'error',
                    payload: t('msg__err__branch_token_required', '分支密钥不能为空'),
                })
            }
            
            return
        }
        
        const {code, data} = await authorizationService.signIn(branchId, branchToken)
        if (code !== ResponseCode.S_OK) {
            enqueueSnackbar("登录失败", {
                variant: "error"
            })
        } else {
            enqueueSnackbar("登录成功", {
                variant: "success"
            })
            branchService.persistAccessToken(data.token);
    
            // @ts-ignore
            let { from } = history.location.state || { from: { pathname: "/" } };
    
            history.push(from);
        }
        
    }, [branchService, authorizationService, branchId, branchToken])
    
    const onBranchIdChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateBranchId({
            type: 'updateId',
            payload: e.target.value,
        })
    }, [])
    
    const onBranchTokenChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateBranchToken({
            type: 'updateToken',
            payload: e.target.value,
        })
    }, [])
    
    return (
        <>
            <Helmet>
                <title>{t('title', '登录')}</title>
            </Helmet>
            <form noValidate autoComplete='on'>
                <Grid container className={klass.wrapper} direction="row" justify="center" alignItems="center">
                    <Card className={klass.card}>
                        <div className={klass.header}>
                            <FingerprintIcon fontSize='inherit' />
                        </div>
                        <div className={klass.hint}>
                            {t('form__label__hint', 'App Center')}
                        </div>
                        <div className={klass.input}>
                            <TextField
                                margin='dense'
                                fullWidth
                                required
                                value={branchId}
                                onChange={onBranchIdChange}
                                error={!!branchIdErr}
                                helperText={branchIdHt}
                                label={t('form__label__branch_id', '分支 ID')} />
                            <TextField
                                margin='dense'
                                fullWidth
                                required
                                type='password'
                                value={branchToken}
                                onChange={onBranchTokenChange}
                                error={!!branchTokenErr}
                                helperText={branchTokenHt}
                                label={t('form__label__branch_token', '分支密钥')} />
                        </div>
                        <div className={klass.action}>
                            <Button
                                fullWidth
                                variant='contained'
                                disabled={!branchId || !branchToken}
                                onClick={onSignIn}
                                color='primary'>
                                {t('form__btn__sign_in', '登录')}
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </form>
        </>
    )
}

export default Login

interface IBranchIdState {
    id?: string;
    err?: boolean;
    ht?: string;
}

type IBranchIdStateAction =
    {
        type: 'updateId';
        payload: string;
    } |
    {
        type: 'error',
        payload: string;
    }

interface IBranchTokenState {
    token?: string;
    err?: boolean;
    ht?: string;
}

type IBranchTokenStateAction =
    {
        type: 'updateToken';
        payload: string;
    } |
    {
        type: 'error',
        payload: string;
    }
