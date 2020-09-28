/**
 * Created by samhwang1990@gmail.com.
 */

enum ResponseCode {
    S_OK = 'S_OK',

    FA_HTTP_400 = 'FA_HTTP_400',
    FA_HTTP_401 = 'FA_HTTP_401',
    FA_HTTP_403 = 'FA_HTTP_403',
    FA_HTTP_404 = 'FA_HTTP_404',
    FA_HTTP_406 = 'FA_HTTP_406',
    FA_HTTP_410 = 'FA_HTTP_410',
    FA_HTTP_422 = 'FA_HTTP_422',
    FA_HTTP_500 = 'FA_HTTP_500',
    FA_HTTP_502 = 'FA_HTTP_502',
    FA_HTTP_503 = 'FA_HTTP_503',
    FA_HTTP_504 = 'FA_HTTP_504',

    FA_UNKNOWN_ERROR = 'FA_UNKNOWN_ERROR',
    FA_INVALID_PARAMS = 'FA_INVALID_PARAMS',
    FA_UNAUTHORIZED = 'FA_UNAUTHORIZED',
    FA_OPERATION_NOT_FOUND = 'FA_OPERATION_NOT_FOUND',
    FA_OPERATION_FORBIDDEN = 'FA_OPERATION_FORBIDDEN',
    FA_OPERATION_CANCELED = 'FA_OPERATION_CANCELED',

    FA_TODO = 'FA_TODO',

    FA_ACCESS_TOKEN_INVALID = 'FA_ACCESS_TOKEN_INVALID',
}

export default ResponseCode;
