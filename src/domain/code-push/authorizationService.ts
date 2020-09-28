/**
 * Created by samhwang1990@gmail.com.
 */
import jsr from 'jsrsasign'
import IAuthorizationService from "../IAuthorization"
import { IClient } from "./client"
import IServiceResponse from "../IServiceResponse"
import {ILoginResult} from "../model/Authentication"
import {auth} from "./internal/endpoint/auth";

export class AuthorizationService implements IAuthorizationService {
    public readonly client: IClient;
    
    constructor(client: IClient) {
        this.client = client;
    }
    
    async signIn(id, token: string): Promise<IServiceResponse<ILoginResult>> {
        const header = {alg: 'HS256', typ: 'JWT'};
    
        const { jws } = jsr.KJUR
        const tNow = jws.IntDate.get('now');
        const tEnd = jws.IntDate.get('now + 1day');
        
        const payload = {
            nbf: tNow,
            iat: tNow,
            exp: tEnd,
            
            iss: 'app center',
            sub: id,
        }
        
        const jwt = jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), token)
        
        return await auth(this.client, jwt)
    }
}
