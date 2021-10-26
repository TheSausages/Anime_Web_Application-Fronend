import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languages } from './Languages';

import Polish from './translations/Polish.json'
import English from './translations/English.json'

i18n.use(LanguageDetector).init({
    resources: {
        Polish,
        English
    },
    fallbackLng: languages.english.name,
    debug: false,
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false,
    },
})

export default i18n;