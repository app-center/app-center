/**
 * Created by samhwang1990@gmail.com.
 */
import {IBranchInfo} from "../domain/model/BranchInfo";
import {useBranchService} from "./useDomain";
import {useQuery, UseQueryObjectConfig} from "react-query";
import {QueryResult} from "react-query/types/core/types";
import ResponseCode from "../constant/ResponseCode";

export function useQueryBranchInfo(config?: UseQueryObjectConfig<IBranchInfo, ResponseCode>): QueryResult<IBranchInfo, ResponseCode> {
    const branchService = useBranchService()
    
    config = Object.assign({}, {
        queryKey: "branch__info",
        queryFn: async () => {
            const response = await branchService.getBranchInfo()
            if (response.code !== ResponseCode.S_OK) {
                throw response.code
            } else {
                return response.data
            }
        },
    }, config)
    
    return useQuery(config)
}
