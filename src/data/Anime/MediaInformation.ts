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

/** Interface representing the complete information on a media in the anilist service. */
export interface MediaInformation {
    /** Edges of the media information. */
    edges?: MediaEdge[]

    /** Nodes of the media information. */
    nodes?: MediaB[]

    /** Page information on the media information. */
    pageInfo?: PageInfo
}


/** Edge representing information on a media. */
export interface MediaEdge {
    /** Node of the media. */
    node: MediaB

    /** Id of the media. */
    id: number

    /** Relation type of the media. */
    relationType: Relation
}

/** Interface representing the detailer media information. */
export interface MediaB {
    /** Id of the media/ */
    id: number

    /** Season in which the media started. */
    season: Season

    /** Year during which the media started. */
    seasonYear: number

    /** Genres to which the media belongs. */
    genres: string[]

    /** Format of the media. */
    format: Format

    /** Is the media adult? */
    isAdult: boolean

    /** Status of the media. */
    status: Status

    /** Type of the media. */
    type: string

    /** Average media score in tha Anilist service. */
    averageScore?: number

    /** Average score in the local service. */
    bachaniAverageScore?: number

    /** Number of favourites in the Anilist service. */
    favourites?: number

    /** Number of favourites in the local service. */
    bachaniFavourites?: number

    /** Number of episodes of the media. */
    episodes: number

    /** Duration of episodes. */
    duration: number

    /** Information on the next airing episode. */
    nextAiringEpisode: NextAiringEpisode
    
    /** Titles of the media. */
    title: Titles

    /** Cover images of the media. */
    coverImage: CoverImage

    /** Description of the media. */
    description: string

    /** Starting date of the media emmision. */
    startDate: FuzzyDate

    /** Ending date of the media emision. */
    endDate: FuzzyDate

    /** Relations of the media. */
    relations: MediaInformation

    /** Characters that appear in the media. */
    characters: CharacterInformation

    /** Staff that worked on the media. */
    staff: StaffInformation

    /** Reviews from the local service. */
    reviews: Review[];

    /** Custom information on the Anime from the local service. */
    localAnimeInformation: LocalAnimeInformation;

    /** 
     * Anime user information from the local service. 
     * Only available when the user is logged in.
    */
    animeUserInformation?: AnimeUserInformation
}

/** Information on the next airing episode. */
export interface NextAiringEpisode {
    /** Id of the next episode. */
    id: number

    /** When is the next episode airing. */
    airingAt: number

    /** Time until the next episode airs. */
    timeUntilAiring: number

    /** Next episode number. */
    episode: number

    /** Media id of the next episode. */
    mediaId: number
}