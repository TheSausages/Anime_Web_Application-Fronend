import { MediaB } from "../MediaInformation";
import { PageInfo } from "../PageInfo";
import { Season } from "./Enums";

export interface CurrectSeasonInformation {
    currentSeason: {
        year: number
        season: Season
    }
    media: MediaB[]
    pageInfo: PageInfo
}