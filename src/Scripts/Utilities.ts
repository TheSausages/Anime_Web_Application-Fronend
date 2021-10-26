import { FuzzyDate } from "../data/Anime/Smaller/FuzzyDate";
import { Titles } from "../data/Anime/Smaller/Titles";
import { AuthenticationProperties } from "../Properties/AuthenticationProperties";
import { TFunction, useTranslation } from "react-i18next";

export function checkIfLoggedIn(): boolean {
    const accessToken = localStorage.getItem(AuthenticationProperties.accessTokenItem)
    const refreshToken = localStorage.getItem(AuthenticationProperties.refreshTokenItem)
    return (refreshToken && accessToken && accessToken !== 'undefined') ? true : false;
}

export function checkIfGivenUserLoggedIn(username: string): boolean {
    if (username === undefined || !username || username === '') {
        return false;
    }

    let logged: string | null = localStorage.getItem(AuthenticationProperties.usernameItem);

    if (logged === null) {
        return false;
    }

    return logged.toLocaleLowerCase() === username.toLocaleLowerCase();
}

export function checkIfObjectIsEmpty(object: Object) {
    return Object.keys(object).length === 0;
}

export function FindFirstNotUndefined(elements: any[]) {
    const { t } = useTranslation();

    var title: string = elements[elements.findIndex(val => val)];

    if (title) {
        return title
    }

    return t("fieldErrors.fieldNotFound", { field: t("anime.animeInformation.title") });
}

//This function needs to have the translation function passed down bcs error
//Also because it's quite deep, need to ignore an error in the last line
export function TitlesInWantedOrder(titles: Titles, t: TFunction<any>) {
    if (titles.english) {
        return titles.english
    }

    if (titles.romaji) {
        return titles.romaji
    }

    if (titles.native) {
        return titles.native
    }

    // @ts-ignore
    return t("fieldErrors.fieldNotFoundNV");
}

export function Capitalize(value: any) {
    if (typeof value === 'string') {
        value = value.replaceAll("_", " ")

        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return value;
}

export function ValueOrNotKnown(value: any, capitalize: boolean = true) {
    const { t } = useTranslation();

    if (typeof value === 'string') {
        value = value.replaceAll("_", " ")
    }

    return !value && (value === 'number' && value === 0) ? 
        t("fieldErrors.fieldNotKnown")
    : 
        (capitalize ? Capitalize(value): value)
}

export function DateOrNotKnown(value: FuzzyDate) {
    const { t } = useTranslation();

    return !value.year ? t("fieldErrors.fieldNotKnown") : (value.day + '.' + value.month + '.' + value.year)
}

export function getRandomColor(dark?: boolean) {
    var letters = '0123456789ABCDEF';
    var darkLetters = '01234'
    var color = '#';

    let genFunction: () => string
    
    dark ? 
        genFunction = function(): string {
            return Math.random() >= 0.5 ? darkLetters[Math.floor(Math.random() * 4)] : letters[Math.floor(Math.random() * 16)]
        }
    :
        genFunction = function(): string {
            return letters[Math.floor(Math.random() * 16)];
        }

    for (var i = 0; i < 6; i++) {
        color += genFunction()
    }
    
    return color
}