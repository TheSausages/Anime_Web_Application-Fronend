import { PageInfo } from "./PageInfo";

export interface StaffInformation {
    edges?: StaffEdge[]
    nodes?: Staff[]
    pageInfo?: PageInfo
}

export interface StaffEdge {
    node: Staff

    id: number
    role: String
}

export interface Staff {
    id: number
    name: StaffName
    language: String
    image: {
        large: String
        medium: String
    }
    description: String
    primaryOccupation: String[]
}

export interface StaffName {
    first: String
    middle: String
    last: String
    full: String
    native: String
}