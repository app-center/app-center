/**
 * Created by samhwang1990@gmail.com.
 */
import {IBranchInfo} from "../domain/model/BranchInfo";
import {useBranchService, useEnvService, useVersionService} from "./useDomain";
import {QueryConfig, useQuery} from "react-query";
import {QueryResult} from "react-query/types/core/types";
import ResponseCode from "../constant/ResponseCode";
import {IEnvInfo} from "../domain/model/EnvInfo";
import {IVersionInfo} from "../domain/model/VersionInfo";

export function useQueryBranchInfo(config?: QueryConfig<IBranchInfo, ResponseCode>): QueryResult<IBranchInfo, ResponseCode> {
    const branchService = useBranchService()
    
    const useConfig = {
        queryKey: ["branch__info"],
        queryFn: async () => {
            const response = await branchService.getBranchInfo()
            if (response.code !== ResponseCode.S_OK) {
                throw response.code
            } else {
                return response.data
            }
        },
        config,
    }
    
    return useQuery(useConfig)
}

export function useQueryEnvList(config?: QueryConfig<IEnvInfo[], ResponseCode>): QueryResult<IEnvInfo[], ResponseCode> {
    const envService = useEnvService()
    
    const useConfig = {
        queryKey: ["env__list"],
        queryFn: async () => {
            const response = await envService.fetchEnvList()
            if (response.code !== ResponseCode.S_OK) {
                throw response.code
            } else {
                return response.data
            }
        },
        config,
    }
    
    return useQuery(useConfig)
}

export function useQueryEnvInfo(envId: string, config?: QueryConfig<IEnvInfo, ResponseCode>): QueryResult<IEnvInfo, ResponseCode> {
    const envService = useEnvService()
    
    const useConfig = {
        queryKey: ["env__info", envId],
        queryFn: async () => {
            const response = await envService.fetchEnvInfo(envId)
            if (response.code !== ResponseCode.S_OK) {
                throw response.code
            } else {
                return response.data
            }
        },
        config,
    }
    
    return useQuery(useConfig)
}

export function useQueryVersionList(envId: string, config?: QueryConfig<IVersionInfo[], ResponseCode>): QueryResult<IVersionInfo[], ResponseCode> {
    const versionService = useVersionService()
    
    const useConfig = {
        queryKey: ["version__list", envId],
        queryFn: async () => {
            const response = await versionService.fetchVersionList(envId)
            if (response.code !== ResponseCode.S_OK) {
                throw response.code
            } else {
                return response.data
            }
        },
        config,
    }
    
    return useQuery(useConfig)
}
