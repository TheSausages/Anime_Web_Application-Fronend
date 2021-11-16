/**
 * Interface containing information that each implemented language should hold.
 */
export interface LanguageObject {
    /** Name of the language, also used to retrieve corresponding transations. Examples include *English* or *Polish* */
    name: string;
    /** Code for the language, used by *i18n* */
    countryCode: string,
    /** Name of the Flag used to select the language. `MUST` be a file found in *public/images* */
    countryFlagPath: string;
}

/**
 * Interface for a collection of Languages.
 */
export interface LanguagesSet {
    [key: string]: LanguageObject;
}

/**
 * Languages available for the user to select for page language.
 * Currently available languages:
 * - English
 * - Polish
 */
export const languages: LanguagesSet = {
    english: {
        name: "English",
        countryCode: "en",
        countryFlagPath: "England.png"
    },
    polish: {
        name: "Polish",
        countryCode: "pl",
        countryFlagPath: "Poland.png"
    }
}