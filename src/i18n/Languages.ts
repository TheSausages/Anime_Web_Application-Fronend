export interface LanguageObject {
    name: string;
    countryCode: string,
    countryFlagPath: string;
}

export interface LanguagesSet {
    [key: string]: LanguageObject;
}

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