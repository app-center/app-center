/**
 * Created by samhwang1990@gmail.com.
 */
import {IClient} from "./client";
import IServiceResponse from "../IServiceResponse";
import ResponseCode from "../../constant/ResponseCode";
import {IUploadService} from "../IUpload";
import {v1_upload_pkg} from "./internal/endpoint/v1_upload_pkg";

export class UploadService implements IUploadService {
    public readonly client: IClient;
    
    constructor(client: IClient) {
        this.client = client;
    }
    async uploadPkg(file:File): Promise<IServiceResponse<string>> {
        if (!file) {
            return {
                code: ResponseCode.FA_INVALID_PARAMS,
            }
        }
        
        const res = await v1_upload_pkg(this.client, file)
        
        if (res.code === ResponseCode.S_OK) {
            return {
                code: ResponseCode.S_OK,
                data: res.data.fileKey,
            }
        }
        
        return {
            code: res.code
        }
    }
}
