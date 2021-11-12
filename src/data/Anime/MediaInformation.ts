import { Relation } from "./Smaller/Enums";
import { PageInfo } from "./PageInfo";
import { CoverImage } from "./Smaller/CoverImage";
import { Format, Season, Status } from "./Smaller/Enums";
import { FuzzyDate } from "./Smaller/FuzzyDate";
import { Titles } from "./Smaller/Titles";
import { StaffInformation } from "./StaffInformation";
import { CharacterInformation } from "./CharacterInformation";
import { AnimeUserInformation, Review } from "./Smaller/AnimeUserInformation";
import { LocalAnimeInformation } from "./LocalAnimeInformation";

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

    /*Local anime Reviews*/
    reviews: Review[];

    /*Custom stuff, not found in Anilist Api*/
    localAnimeInformation: LocalAnimeInformation;

    /*User information, only available when user is logged in*/
    animeUserInformation?: AnimeUserInformation
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