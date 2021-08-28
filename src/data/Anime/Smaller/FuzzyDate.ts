export interface FuzzyDate {
    day?: number
    month?: number
    year: number
}

export function getDateFromFuzzy(fuzzy: FuzzyDate) {
    return new Date(`${fuzzy.year}-${fuzzy.month ?? '01'}-${fuzzy.day ?? '01'}`);
}