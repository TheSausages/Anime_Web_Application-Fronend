import { NestedValue } from "react-hook-form";
import { ForumCategory } from "./ForumCategory";
import { Tag } from "./Tag";
import { ThreadStatus } from "./Types";

/**
 * Query used to search for threads using conditions selected by the user.
 */
export interface ForumQuery {
    /** The thread should have been created after this date. */
    minCreation?: Date;

    /** The thread should have been created before this date. */
    maxCreation?: Date;

    /** The thread should have been modified for the last time before this date. */
    minModification?: Date;

    /** The thread should have been modified for the last time before this date. */
    maxModification?: Date;

    /** The thread should have at least this number of posts. */
    minNrOfPosts?: number | "";

    /** The post should have at maximun this number of posts. */
    maxNrOfPosts?: number | "";

    /** The thread should have this category. */
    category?: ForumCategory;

    /** The thread should containg this phrase in it's title. */
    title?: string;

    /** The creator's username should containg this phrase in it's title. */
    creatorUsername?: string;

    /** What tags should the thread have? */
    tags?: NestedValue<Tag[]>;

    /** The thread should have this status. */
    status?: ThreadStatus;
}