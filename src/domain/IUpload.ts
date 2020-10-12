/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "./IServiceResponse";

export interface IUploadService {
    uploadPkg(file: File): Promise<IServiceResponse<string>>;
}
