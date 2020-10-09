/**
 * Created by samhwang1990@gmail.com.
 */

export type IBranchId = string;

export interface IBranchInfo {
    id: IBranchId;
    name: string;
    createAt: number;
}

export type IBranchInfoFromSvr = IBranchInfo
