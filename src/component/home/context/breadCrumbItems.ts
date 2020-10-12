/**
 * Created by samhwang1990@gmail.com.
 */

import {IHomeCtxOptions} from "./index";
import {Variant} from "@material-ui/core/styles/createTypography";
import {useLocales} from "../../.locales";

interface IBreadCrumbItem {
    link?: string;
    variant?: Variant | 'inherit';
    text: string;
}

declare module './index' {
    interface IHomeCtx {
        breadCrumbItems: IBreadCrumbItem[];
    }
}


export function withBreadCrumbItems(): IHomeCtxOptions {
    return [(ctx) => {
        const items: IBreadCrumbItem[] = [
            {
                link: '/',
                variant: 'h6',
                text: 'AppCenter',
            }
        ]
        ctx.breadCrumbItems = items
    }, (ctx) => {
        const appT = useLocales()
        
        let items = ctx.breadCrumbItems
        
        if (ctx.selectedEnvId) {
            items.push({
                link: `/env/${ctx.selectedEnvId}`,
                text: ctx.selectedEnvName || ctx.selectedEnvId,
            })
        }
        
        if (ctx.versionReleaseFlag) {
            items.push({
                link: `/env/${ctx.selectedEnvId}/version/release`,
                text: appT('txt__release_version', '版本发布')
            })
        }
        
        if (items.length > 1) {
            items[items.length - 1].link = undefined
        }
    }]
}
