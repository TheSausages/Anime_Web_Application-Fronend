export const SeasonArray = ["SPRING", "SUMMER", "AUTUMN", "WINTER"]
export type Season = typeof SeasonArray[number]

export const CharacterRoleArray = ["MAIN", "SUPPORTING", "BACKGROUND"]
export type CharacterRole = typeof CharacterRoleArray[number]

export const SourceArray = ["ORIGINAL", "MANGA", "LIGHT_NOVEL", "VISUAL_NOVEL", 
    "VIDEO_GAME", "OTHER", "NOVEL", "DOUJINSHI", "ANIME"]
export type Source = typeof SourceArray[number]

export const StatusArray = ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"]
export type Status = typeof StatusArray[number]

export const FormatArray = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", 
    "MUSIC", "MANGA", "NOVEL", "ONE_SHOT"]
export type Format = typeof FormatArray[number]

export const TypeArray = ["ANIME", "MANGA"]
export type Type = typeof TypeArray[number]

export const RelationArray = ["ADAPTATION", "PREQUEL", "SEQUEL", "PARENT", "SIDE_STORY", "CHARACTER",
    "SUMMARY", "ALTERNATIVE", "SPIN_OFF", "OTHER", "SOURCE", "COMPILATION", "CONTAINS"]
export type Relation = typeof RelationArray[number]