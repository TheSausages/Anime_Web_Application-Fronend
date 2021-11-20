/**
 * Interface representing the date format recieved from Anilist.
 */
export interface FuzzyDate {
    /** Day of date */
    day?: number

    /** Month of date in  number format */
    month?: number

    /** Year of date */
    year: number
}

/** Small method for changing a {@link FuzzyDate} to a normal Date object.  */
export function getDateFromFuzzy(fuzzy: FuzzyDate): Date {
    return new Date(`${fuzzy.year}-${fuzzy.month ?? '01'}-${fuzzy.day ?? '01'}`);
}