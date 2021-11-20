/**
 * Interface representing the possible titles recieved from an Anilist resource.
 */
export interface Titles {
    /** The english title. */
    english?: string

    /** The romaji title - oribinal title writen using the latin alphabet. */
    romaji?: string

    /** The native title - written in the native alphabet. */
    native?: string
}