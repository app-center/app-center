/**
 * Created by zhiyuan.huang@thisiskapok.com.
 */

import {useRef} from "react";

export interface IUseCtxExport<T> {
    useContext(): T
    withContext(...options: ICtxOption<T>[]): void;
}

export function useCtx<T = {}>(): IUseCtxExport<T> {
    const captureOptions = useRef<ICtxOptionMiddleware<T>[]>([]);
    const bubbleOptions = useRef<ICtxOptionMiddleware<T>[]>([]);
    
    let captureOptionsIndex = 0, bubbleOptionsIndex = 0;
    
    const withContext = (...inps: ICtxOption<T>[]) => {
        inps.forEach(inp => {
            if (!inp.useContext) return;
            
            let mids = inp.useContext;
            
            if (!Array.isArray(mids)) {
                mids = [mids, undefined];
            }
            
            if (typeof mids[0] === 'function') {
                captureOptions.current[captureOptionsIndex++] = mids[0];
            }
            
            if (typeof mids[1] === 'function') {
                bubbleOptions.current[bubbleOptionsIndex++] = mids[1];
            }
        })
    };
    
    const useContext = (): T => {
        // @ts-ignored
        let ctx: T = {};
        
        captureOptions.current.forEach(option => {
            let newCtx = option(ctx);
            if (!!newCtx) {
                ctx = newCtx
            }
        })
        
        for (let i = bubbleOptions.current.length - 1; i >= 0; --i) {
            let option = bubbleOptions.current[i];
            let newCtx = option(ctx);
            if (!!newCtx) {
                ctx = newCtx
            }
        }
        
        return ctx;
    }
    
    return {
        withContext,
        useContext,
    }
}

export interface ICtxOption<T> {
    useContext?: ICtxOptionMiddleware<T> | [ICtxOptionMiddleware<T> | void, ICtxOptionMiddleware<T> | void];
}

type ICtxOptionMiddleware<T> = (ctx: T) => (T | void);
