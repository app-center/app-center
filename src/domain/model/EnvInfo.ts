/**
 * Created by samhwang1990@gmail.com.
 */

export interface IEnvInfo {
    id: string;
    name: string;
    branchId: string;
    encToken: string;
    createAt: number;
}

export type IEnvInfoFromSvr = IEnvInfo

export interface IEnvCreateForm {
    name: string;
    id?: string;
    encToken?: string;
}
