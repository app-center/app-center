/**
 * Created by samhwang1990@gmail.com.
 */

import React, {useContext} from "react";
import IAuthorizationService from "../domain/IAuthorization";
import IAccountService from "../domain/IAccount";

interface IDomainContext {
    authorizationService: IAuthorizationService
    accountService: IAccountService
}

export const DomainContext = React.createContext<IDomainContext>({
    authorizationService: undefined,
    accountService: undefined,
});

export function useDomainContext(): IDomainContext {
    return useContext(DomainContext);
}

export function useAuthorizationService(): IAuthorizationService {
    return useDomainContext().authorizationService
}

export function useAccountService(): IAccountService {
    return useDomainContext().accountService
}
