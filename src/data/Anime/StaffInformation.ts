import { PageInfo } from "./PageInfo";

/**
 * Interface representing the complete information on a staff member in the anilist service.
 */
export interface StaffInformation {
    /** Edges of the staff member information. */
    edges?: StaffEdge[]

    /** Nodes of the staff member information. */
    nodes?: Staff[]

    /** Page information on the staff member information. */
    pageInfo?: PageInfo
}

/** Edge representing information on a staff member. */
export interface StaffEdge {
    /** Node of the staff member. */
    node: Staff

    /** Id of the staff member. */
    id: number

    /** Role of the staff member. */
    role: String
}

/** Interface representing the detailed staff member information. */
export interface Staff {
    /** Id of the staff member. */
    id: number

    /** Name of the staff member. */
    name: StaffName

    /** Language of the staff member. */
    languageV2: String

    /** Image of the staff member. */
    image: {
        /** The large image link. */
        large: string

        /** The medium image link. */
        medium: string
    }

    /** Description of the staff member. */
    description: String

    /** Staff's member primary occupation. */
    primaryOccupation: String[]
}

/** Interface representing complete information on a staff member name. */
export interface StaffName {
    /** First name in latin alphabet. */
    first: String

    /** Middle name in latin alphabet. */
    middle: String

    /** Last name in latin alphabet. */
    last: String

    /** Full name of the character in latin alphabet. */
    full: String

    /** The name in its native alphabet. */
    native: String
}