/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useContext} from "react";
import IAuthorizationService from "../domain/IAuthorization";
import IBranchService from "../domain/IBranch";

interface IDomainContext {
    authorizationService: IAuthorizationService
    branchService: IBranchService
}

export const DomainContext = React.createContext<IDomainContext>({
    authorizationService: undefined,
    branchService: undefined,
});

export function useDomainContext(): IDomainContext {
    return useContext(DomainContext);
}

export function useAuthorizationService(): IAuthorizationService {
    return useDomainContext().authorizationService
}

export function useBranchService(): IBranchService {
    return useDomainContext().branchService
}
