import { Relation } from "./General/Enums";
import { PageInfo } from "./PageInfo";
import { CoverImage } from "./General/CoverImage";
import { Format, Season, Status } from "./General/Enums";
import { FuzzyDate } from "./General/FuzzyDate";
import { Titles } from "./General/Titles";
import { StaffInformation } from "./StaffInformation";
import { CharacterInformation } from "./CharacterInformation";

export interface MediaInformation {
    edges?: MediaEdge[]
    nodes?: MediaB[]
    pageInfo?: PageInfo
}

export interface MediaB {
    id: number

    season: Season
    seasonYear: number
    genres: string[]
    format: Format
    isAdult: boolean
    status: Status
    type: string

    averageScore?: number
    bachaniAverageScore?: number
    favourites?: number
    bachaniFavourites?: number

    episodes: number
    duration: number
    nextAiringEpisode: NextAiringEpisode
    
    title: Titles
    coverImage: CoverImage
    description: string

    startDate: FuzzyDate
    endDate: FuzzyDate

    relations: MediaInformation
    characters: CharacterInformation
    staff: StaffInformation
}

export interface NextAiringEpisode {
    id: number
    airingAt: number
    timeUntilAiring: number
    episode: number
    mediaId: number
}

export interface MediaEdge {
    node: MediaB

    id: number
    relationType: Relation
}