/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "./IServiceResponse";
import {IEnvInfo} from "./model/EnvInfo";

export interface IEnvService {
    fetchEnvList(): Promise<IServiceResponse<IEnvInfo[]>>;
    fetchEnvInfo(envId: string): Promise<IServiceResponse<IEnvInfo>>;
}
