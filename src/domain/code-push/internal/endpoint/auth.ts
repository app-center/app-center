/**
 * Created by samhwang1990@gmail.com.
 */
import {ITransport} from "../transport";
import IServiceResponse from "../../../IServiceResponse";
import {ILoginResult} from "../../../model/Authentication";

export function auth(transport: ITransport, token: string): Promise<IServiceResponse<ILoginResult>> {
    return transport.request.post('auth/jwt', {
        data: {
            token,
        }
    });
}
