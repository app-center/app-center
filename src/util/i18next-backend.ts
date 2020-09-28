/**
 * Created by samhwang1990@gmail.com.
 */
import {BackendModule, InitOptions, ReadCallback, ResourceKey, Services} from "i18next";
import {AsyncSeriesBailHook} from "@funnyecho/hamon";

export const hookRead = new AsyncSeriesBailHook<[string, string], ResourceKey>(function (namespace: string, language: string): string {
    return generateReadBucketKey(namespace, language);
});

export default {
    type: "backend",
    init(services: Services, backendOptions: object, i18nextOptions: InitOptions) {
    },
    read(language: string, namespace: string, callback: ReadCallback) {
        hookRead.callAsync(namespace, language, function (err, data) {
            if (err != null) {
                callback(err, false)
                return;
            }
            
            callback(null, data);
            return
        })
    }
} as BackendModule

export function generateReadBucketKey(namespace: string, language: string): string {
    return `${namespace}/${language}`;
}
