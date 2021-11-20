import { CharacterRole } from "./Smaller/Enums";
import { PageInfo } from "./PageInfo";
import { Staff } from "./StaffInformation";

/**
 * Interface representing the complete information on a character in the anilist service.
 */
export interface CharacterInformation {
    /** Edges of the character information. */
    edges?: CharacterEdge[]

    /** Nodes of the character information. */
    nodes?: Character[]

    /** Page information on the character information. */
    padeInfo?: PageInfo
}

/** Edge representing information on a character. */
export interface CharacterEdge {
    /** Node of the character. */
    node: Character

    /** Id of the character. */
    id: number

    /** Role of the character. */
    role: CharacterRole

    /** Simple name of the character. */
    name: String

    /** Voice actors that played the characters.  */
    voiceActors: Staff[]
}

/** Interface representing the in-media character information. */
export interface Character {
    /** Id of the character. */
    id: number

    /** Complete name of the character. */
    name: CharacterName

    /** Image of the character. */
    image: {
        /** The large image link. */
        large: string

        /** The medium image link. */
        medium: string
    }
}

/** Interface representing complete information on a characters name. */
export interface CharacterName {
    /** First name in latin alphabet. */
    first?: string

    /** Middle name in latin alphabet. */
    middle?: string

    /** Last name in latin alphabet. */
    last?: string

    /** Full name of the character in latin alphabet. */
    full?: string

    /** The name in its native alphabet. */
    native?: string
}