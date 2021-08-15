import { CharacterRole } from "./Smaller/Enums";
import { PageInfo } from "./PageInfo";
import { Staff } from "./StaffInformation";

export interface CharacterInformation {
    edges?: CharacterEdge[]
    nodes?: Character[]
    padeInfo?: PageInfo
}

export interface CharacterEdge {
    node: Character

    id: number
    role: CharacterRole
    name: String
    voiceActors: Staff[]
}

export interface Character {
    id: number
    name: CharacterName
    image: {
        large: string
        medium: string
    }
}

export interface CharacterName {
    first?: String
    middle?: String
    last?: String
    full?: String
    native?: String
}