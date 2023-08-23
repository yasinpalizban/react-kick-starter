import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import enLang from '../../assets/i18n/en.json';
import faLang from '../../assets/i18n/fa.json';
localStorage.setItem('lang','en');
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        resources: {en:{translation:enLang}, fa:{translation:faLang}},
        debug: false,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        /*
        react: {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
          useSuspense: true,
        }
        */
    });

export default i18n;
