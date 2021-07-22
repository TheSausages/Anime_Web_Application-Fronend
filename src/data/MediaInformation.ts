import { Relation } from "./General/Enums";
import { PageInfo } from "./PageInfo";

export interface MediaInformation {
    edges?: MediaEdge[]
    nodes?: Media[]
    pageInfo?: PageInfo
}

import { CoverImage } from "./General/CoverImage";
import { Format, Season, Status } from "./General/Enums";
import { FuzzyDate } from "./General/FuzzyDate";
import { titles } from "./General/Titles";

export interface Media {
    id: number

    season: Season
    seasonYear: number
    genres: String[]
    format: Format
    isAdult: boolean
    status: Status

    anilistAverageScore?: number
    bachaniAverageScore?: number
    anilistFavourites?: number
    bachaniFavourites?: number

    episodes: number
    duration: number
    nextAiringEpisode: NextAiringEpisode
    
    titles: titles
    coverImage: CoverImage
    description: String

    startDate: FuzzyDate
    endDate: FuzzyDate
}

export interface NextAiringEpisode {
    id: number
    airingAt: number
    timeUntilAiring: number
    episode: number
    mediaId: number
}

export interface MediaEdge {
    Node: Media

    id: number
    relation: Relation
}