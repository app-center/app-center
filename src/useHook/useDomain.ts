/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useContext} from "react";
import IAuthorizationService from "../domain/IAuthorization";
import IBranchService from "../domain/IBranch";
import {IEnvService} from "../domain/IEnv";
import {IVersionService} from "../domain/IVersion";

interface IDomainContext {
    authorizationService: IAuthorizationService
    branchService: IBranchService
    envService: IEnvService
    versionService: IVersionService
}

export const DomainContext = React.createContext<IDomainContext>({
    authorizationService: undefined,
    branchService: undefined,
    envService: undefined,
    versionService: undefined,
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

export function useEnvService(): IEnvService {
    return useDomainContext().envService
}

export function useVersionService(): IVersionService {
    return useDomainContext().versionService
}
