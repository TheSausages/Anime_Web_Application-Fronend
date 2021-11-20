import { Format, Season, SeasonArray, Status } from "./Smaller/Enums";
import fastCartesian from 'fast-cartesian'

/**
 * Small helper interface for holding information on a selected season.
 */
export interface SeasonYear {
    /** Year of the season. */
    year: number;

    /** Season */
    season: Season;
}

/**
 * Small method for getting all possible Seasons in an array fo years.
 */
export const SeasonYearArray = fastCartesian([SeasonArray, ["2021", "2020", "2019", "2018"]])
    .flatMap((value) => ({ year: value[1], season: value[0] } as unknown as SeasonYear))
    .sort((a: SeasonYear, b: SeasonYear) => 
    b.year - a.year || SeasonArray.indexOf(b.season) - SeasonArray.indexOf(a.season))

/**
 * Interface representing the query used to search Anime using criteria selected by the user.
 */
export interface AnimeQuery {
    /** The title should contain this phrase. */
    title?: string;

    /** The anime should have aired in this season. */
    season?: SeasonYear;

    /** The anime should have this status. */
    status?: Status;

    /** The anime should have this format. */
    format?: Format;

    /** The anime should have started after this date. */
    minStartDate?: Date;

    /** The anime should have started before this date. */
    maxStartDate?: Date;

    /** The anime should have ended after this date. */
    minEndDate?: Date;

    /** The anime should have ended before this date. */
    maxEndDate?: Date;

    /** The anime should have at least this number of episodes. */
    minNrOfEpisodes?: number | "";

    /** The anime should have at max this number of episodes. */
    maxNrOfEpisodes?: number | "";

    /** The anime should have at least this average score in the anilist service. */
    minAverageScore?: number | "";

    /** The anime shoulds have at max this average score in the anilist service. */
    maxAverageScore?: number | "";
}