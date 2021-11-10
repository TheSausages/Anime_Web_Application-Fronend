import { Format, Season, SeasonArray, Status } from "./Smaller/Enums";
import fastCartesian from 'fast-cartesian'

export interface SeasonYear {
    year: number;
    season: Season;
}

export const SeasonYearArray = fastCartesian([SeasonArray, ["2021", "2020", "2019", "2018"]])
    .flatMap((value) => ({ year: value[1], season: value[0] } as unknown as SeasonYear))
    .sort((a: SeasonYear, b: SeasonYear) => 
    b.year - a.year || SeasonArray.indexOf(b.season) - SeasonArray.indexOf(a.season))

/**
 * Interface used for searching Anime
 * @see AnimeQuery
 */
export interface AnimeQuery {
    title?: string;
    season?: SeasonYear;
    status?: Status;
    format?: Format;
    minStartDate?: Date;
    maxStartDate?: Date;
    minEndDate?: Date;
    maxEndDate?: Date;
    minNrOfEpisodes?: number | "";
    maxNrOfEpisodes?: number | "";
    minAverageScore?: number | "";
    maxAverageScore?: number | "";
}