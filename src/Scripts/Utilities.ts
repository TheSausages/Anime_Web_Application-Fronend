/**
 * Small file containg utility methods.
 */

import { FuzzyDate } from "../data/Anime/Smaller/FuzzyDate";
import { Titles } from "../data/Anime/Smaller/Titles";
import { AuthenticationProperties } from "../Properties/AuthenticationProperties";
import { TFunction, useTranslation } from "react-i18next";

/**
 * Check if any user is logged in right now.
 * @returns Is the user logged in?
 */
export function checkIfLoggedIn(): boolean {
    const accessToken = localStorage.getItem(AuthenticationProperties.accessTokenItem)
    const refreshToken = localStorage.getItem(AuthenticationProperties.refreshTokenItem)
    return (refreshToken && accessToken && accessToken !== 'undefined') ? true : false;
}

/**
 * Check if a concrete user is logged in.
 * @param username Username of the user that is being checked.
 * @returns Is a concrete user logged in?
 */
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

/**
 * Check if the object is empty.
 * @param object Object to be checked.
 * @returns Is the object empty?
 */
export function checkIfObjectIsEmpty(object: Object) {
    return Object.keys(object).length === 0;
}

/**
 * Get a prefered title of an anilist object. Preferences from highest to lowest: English -> Romaji -> Native.
 * NOTE! This method needs tha tranlation function as a parameter.
 * @param titles The titles.
 * @param t The translation function.
 * @returns The title (or an translated error).
 */
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

/**
 * Capitalize a sentense and replace all '_' symbols with ' '.
 * @param value The value to be capitalized.
 * @returns The updated value.
 */
export function Capitalize(value: any) {
    if (typeof value === 'string') {
        value = value.replaceAll("_", " ")

        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return value;
}

/**
 * If the value is a string, replace all '_' symbols with ' ', and if needed Capitalize it.
 * @param value The value.
 * @param capitalize Should the value be capitalized (if needed).
 * @returns The updated value.
 */
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

/**
 * Change a {@link FuzzyDate} to a date string of format 'dd.MM.yyyy'.
 * @param value The date value
 * @returns The formated string value.
 */
export function DateOrNotKnown(value: FuzzyDate): string {
    const { t } = useTranslation();

    return !value.year ? t("fieldErrors.fieldNotKnown") : (value.day + '.' + value.month + '.' + value.year)
}

/**
 * Utility function to get a random color.
 * @param dark Should the color be from the dark spectrum?
 * @returns A randomly generated color.
 */
export function getRandomColor(dark?: boolean) {
    var letters = '0123456789ABCDEF';
    var darkLetters = '01234'
    var color = '#';

    let genFunction: () => string
    
    genFunction = dark ? 
        function(): string {
            return Math.random() >= 0.5 ? darkLetters[Math.floor(Math.random() * 4)] : letters[Math.floor(Math.random() * 16)]
        }
    :
        function(): string {
            return letters[Math.floor(Math.random() * 16)];
        }

    for (var i = 0; i < 6; i++) {
        color += genFunction()
    }
    
    return color
}