/** What seasons are there for Anime */
export const SeasonArray = ["SPRING", "SUMMER", "AUTUMN", "WINTER"]
/** Type of Anime seasons. Created from {@link SeasonArray} values. */
export type Season = typeof SeasonArray[number]

/** How important tot he story is the character */
export const CharacterRoleArray = ["MAIN", "SUPPORTING", "BACKGROUND"]
/** Type of character role importance. Created from {@link CharacterRole} values. */
export type CharacterRole = typeof CharacterRoleArray[number]

/** What is the original source of the anime. */
export const SourceArray = ["ORIGINAL", "MANGA", "LIGHT_NOVEL", "VISUAL_NOVEL", 
    "VIDEO_GAME", "OTHER", "NOVEL", "DOUJINSHI", "ANIME"]
/** Type of anime source. Created from {@link SourceArray} values. */
export type Source = typeof SourceArray[number]

/** What is the current status of the anime. */
export const StatusArray = ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"]
/** Type of current anime status. Created from {@link StatusArray} values. */
export type Status = typeof StatusArray[number]

/** What is the emmision format of the anime. */
export const FormatArray = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", 
    "MUSIC", "MANGA", "NOVEL", "ONE_SHOT"]
/** Type of anime emmision format. Created from {@link FormatArray} */
export type Format = typeof FormatArray[number]

/** Type of the resource Anilist holds in their database. Only the 'Anime' value is used in this application. */
export const TypeArray = ["ANIME", "MANGA"]
/** Type of the type of resource Anilist holds. Created from {@link TypeArray} values. */
export type Type = typeof TypeArray[number]

/** The relations between diffrent anime or its source in {@link SourceArray}. */
export const RelationArray = ["ADAPTATION", "PREQUEL", "SEQUEL", "PARENT", "SIDE_STORY", "CHARACTER",
    "SUMMARY", "ALTERNATIVE", "SPIN_OFF", "OTHER", "SOURCE", "COMPILATION", "CONTAINS"]
/** Type of relations for anime. Created using {@link RelationArray} values. */
export type Relation = typeof RelationArray[number]