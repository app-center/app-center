/**
 * Created by samhwang1990@gmail.com.
 */

export interface IVersionInfo {
    envId: string;
    appVersion: string;
    compatAppVersion: string;
    mustUpdate: boolean;
    changelog: string;
    packageFileKey: string;
    publishAt: number;
}

export type IVersionInfoFromSvr = IVersionInfo
