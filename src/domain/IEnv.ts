/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "./IServiceResponse";
import {IEnvCreateForm, IEnvInfo} from "./model/EnvInfo";

export interface IEnvService {
    fetchEnvList(): Promise<IServiceResponse<IEnvInfo[]>>;
    fetchEnvInfo(envId: string): Promise<IServiceResponse<IEnvInfo>>;
    
    createEnv(params: IEnvCreateForm): Promise<IServiceResponse<IEnvInfo>>;
}
