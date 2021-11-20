/**
 * Interface representing the Anime information from the local Database.
 */
 export interface LocalAnimeInformation {
    /** Id of the anime. */
    animeId: number;

    /** The average score from the local database. */
    averageScore: number;

    /** Nr. of local users that favourited the anime. */
    nrOfFavourites: number;

    /** Nr. of reviews written by the local users. */
    nrOfReviews: number;
}