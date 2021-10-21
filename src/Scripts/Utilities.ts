import { FuzzyDate } from "../data/Anime/Smaller/FuzzyDate";
import { Titles } from "../data/Anime/Smaller/Titles";
import { AuthenticationProperties } from "../Properties/AuthenticationProperties";

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

export function findFirstNotUndefined(elements: any[]) {
    var title: string = elements[elements.findIndex(val => val)];

    if (title) {
        return title
    }

    return "No Title Found";
}

export function titlesInWantedOrder(titles: Titles): string {
    if (titles.english) {
        return titles.english
    }

    if (titles.romaji) {
        return titles.romaji
    }

    if (titles.native) {
        return titles.native
    }

    return "Not Found"
}

export function Capitalize(value: any) {
    if (typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return value;
}

export function valueOrNotKnown(value: any, capitalize: boolean = true) {
    if (typeof value === 'string') {
        value = value.replaceAll("_", " ")
    }

    return !value && (value === 'number' && value === 0) ? "Not Known" : (capitalize ? Capitalize(value): value)
}

export function dateOrNotKnown(value: FuzzyDate) {
    return !value.year ? "Not Known" : (value.day + '.' + value.month + '.' + value.year)
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