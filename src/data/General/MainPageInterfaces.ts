import { MediaB } from "../Anilist/MediaInformation";
import { PageInfo } from "../Anilist/PageInfo";
import { Season } from "./Enums";

export interface CurrectSeasonInformation {
    currentSeason: {
        year: number
        season: Season
    }
    media: MediaB[]
    pageInfo: PageInfo
}