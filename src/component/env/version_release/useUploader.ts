/**
 * Created by samhwang1990@gmail.com.
 */
import {ChangeEvent, Reducer, useCallback, useReducer} from "react";
import IServiceResponse from "../../../domain/IServiceResponse";
import ResponseCode from "../../../constant/ResponseCode";
import {useUploadService} from "../../../useHook/useDomain";

export function useUploader(): IUploaderExports {
    const uploadService = useUploadService()
    
    const [state, dispatch] = useReducer<Reducer<IState, IStateAction>>((state, action) => {
        switch (action.type) {
            case EStateActionType.fire:
                return {
                    state: 'ing',
                    file: action.payload,
                    uploadProgress: 0,
                }
            case EStateActionType.progress:
                if (!state.file) return state
                return {
                    ...state,
                    uploadProgress: action.payload,
                }
            case EStateActionType.response:
                if (!state.file) return state
                return {
                    ...state,
                    state: 'idle',
                    uploadProgress: 1,
                    uploadResponse: action.payload
                }
            case EStateActionType.reset:
                return {
                    state: 'idle',
                }
            default:
                return state
        }
    }, {
        state: 'idle',
    })
    
    const onUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<IServiceResponse<string>> => {
        const file = e.target.files[0]
        
        dispatch({
            type: EStateActionType.fire,
            payload: file,
        })
        
        const res = await uploadService.uploadPkg(file)
        
        dispatch({
            type: EStateActionType.response,
            payload: res,
        })
        
        return res
    }
    
    const onReset = () => {
        dispatch({
            type: EStateActionType.reset,
        })
    }
    
    return {
        ...state,
        onUpload,
        onReset,
    }
}

interface IUploaderExports extends IState {
    onUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<IServiceResponse<string>>
    onReset: () => void
}

interface IState {
    state: 'idle' | 'ing'
    file?: File;
    uploadProgress?: number;
    uploadResponse?: IServiceResponse<string>
}

enum EStateActionType {
    fire,
    progress,
    response,
    reset,
}

type IStateAction = {
    type: EStateActionType.fire;
    payload: File;
} | {
    type: EStateActionType.progress;
    payload: number;
} | {
    type: EStateActionType.response;
    payload: IServiceResponse<string>;
} | {
    type: EStateActionType.reset;
}
