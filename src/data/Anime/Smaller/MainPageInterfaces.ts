import { MediaB } from "../MediaInformation";
import { PageInfo } from "../PageInfo";
import { Season } from "./Enums";

/**
 * Interface representing all data recieved from a current season anime backend request.
 */
export interface CurrentSeasonInformation {
    /** Current season information. */
    currentSeason: {
        /** Current year. */
        year: number

        /** Current season. */
        season: Season
    }

    /** Anime from the current season. */
    media: MediaB[]

    /** Page information on the current season information. */
    pageInfo: PageInfo
}