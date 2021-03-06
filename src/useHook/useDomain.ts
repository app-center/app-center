/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useContext} from "react";
import IAuthorizationService from "../domain/IAuthorization";
import IBranchService from "../domain/IBranch";
import {IEnvService} from "../domain/IEnv";
import {IVersionService} from "../domain/IVersion";
import {IUploadService} from "../domain/IUpload";

interface IDomainContext {
    authorizationService: IAuthorizationService
    branchService: IBranchService
    envService: IEnvService
    versionService: IVersionService
    uploadService: IUploadService
}

export const DomainContext = React.createContext<IDomainContext>({
    authorizationService: undefined,
    branchService: undefined,
    envService: undefined,
    versionService: undefined,
    uploadService: undefined,
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

export function useUploadService(): IUploadService {
    return useDomainContext().uploadService
}
