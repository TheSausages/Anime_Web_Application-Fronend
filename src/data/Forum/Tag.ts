import { TagImportance } from "./Types";

/**
 * Interface representing a thread tag.
 */
export interface Tag {
    /** What is the thread id. */
    tagId: number;

    /** The tag's name. */
    tagName: string;

    /** How important is the tag? */
    tagImportance: TagImportance;

    /** What color should the tag have? */
    tagColor: string;
}