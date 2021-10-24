export interface LanguageObject {
    name: string;
    countryFlagPath: string;
}

export interface LanguagesSet {
    [key: string]: LanguageObject;
}

export const languages: LanguagesSet = {
    english: {
        name: "English",
        countryFlagPath: "England.png"
    },
    polish: {
        name: "Polish",
        countryFlagPath: "Poland.png"
    }
}