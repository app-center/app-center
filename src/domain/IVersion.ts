/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "./IServiceResponse";
import {IVersionInfo} from "./model/VersionInfo";

export interface IVersionService {
    fetchVersionList(envId: string): Promise<IServiceResponse<IVersionInfo[]>>;
}
