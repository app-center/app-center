/**
 * Created by samhwang1990@gmail.com.
 */
import IServiceResponse from "../../../IServiceResponse";
import {ITransport} from "../transport";

interface IUploadResult {
    fileKey: string;
}

export function v1_upload_pkg(transport: ITransport, file: File): Promise<IServiceResponse<IUploadResult>> {
    const formData = new FormData()
    formData.append('pkg', file)
    return transport.request.post('v1/upload/pkg', {
        body: formData,
    })
}
