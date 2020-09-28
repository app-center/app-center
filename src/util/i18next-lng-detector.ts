/**
 * Created by samhwang1990@gmail.com.
 */
import {InitOptions, LanguageDetectorModule, Services} from "i18next";
import {lang__en, lang__zh} from "../constant/I18n";

export default {
    type: 'languageDetector',
    init(services: Services, detectorOptions: object, i18nextOptions: InitOptions) {
    
    },
    detect() {
        let found: string;
        
        if (typeof navigator !== 'undefined') {
            if (navigator.languages) { // chrome only; not an array, so can't use .push.apply instead of iterating
                found = navigator.languages[0]
            }
            
            if (!found && navigator.language) {
                found = navigator.language;
            }
        }
        
        if (!found) return lang__zh;
        if (found.indexOf(lang__en) === 0) return lang__en;
        return lang__zh;
    },
    cacheUserLanguage(lng: string) {
    
    }
} as LanguageDetectorModule
