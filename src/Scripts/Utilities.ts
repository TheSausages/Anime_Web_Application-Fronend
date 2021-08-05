import { FuzzyDate } from "../data/Anilist/Smaller/FuzzyDate";
import { Titles } from "../data/Anilist/Smaller/Titles";

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

export function valueOrNotKnown(value: any, after: string = "", capitalize: boolean = true) {
    if (typeof value === 'string') {
        value = value.replaceAll("_", " ")
    }

    return !value ? "Not Known" : (capitalize ? Capitalize(value) + after : value + after)
}

export function dateOrNotKnown(value: FuzzyDate) {
    return !value.year ? "Not Known" : (value.day + '.' + value.month + '.' + value.year)
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color
}