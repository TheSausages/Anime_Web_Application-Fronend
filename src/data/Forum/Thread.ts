import { NestedValue } from "react-hook-form";
import { PageDTO } from "../General/PageDTO";
import { SimpleUser } from "../General/User/User";
import { ForumCategory } from "./ForumCategory";
import { CompletePost } from "./Post";
import { Tag } from "./Tag";
import { ThreadStatus } from "./Types";

/**
 * Interface containing basic information on a thread.
*/
export interface SimpleThread {
    /** Id of the thread. */
    threadId: number;

    /** Title of the thread. */
    title: string;

    /** How many posts doesn the thread have. */
    nrOfPosts: number;

    /** Current status of the thread. */
    status: ThreadStatus;

    /** Category of the thread. */
    category: ForumCategory;

    /** When was the post created in 'dd.MM.yyyy' format. */
    creation: string;

    /** When was the thread last time modified in 'dd.MM.yyyy' format. */
    modification: string;

    /** Who is the thread creator. */
    creator: SimpleUser;

    /** What tags does the thread have. */
    tags: Tag[];
}

/** A {@link SimpleThread} containing the current users status on the thread. */
export interface SimpleThreadWithUserStatus extends SimpleThread {
    /** The current user thread status. */
    threadUserStatus: ThreadUserStatus;
}

/** A page of {@link SimpleThreadWithUserStatus}. */
export interface SimpleThreadPage extends PageDTO<SimpleThreadWithUserStatus> {}

/**
 * Interface containing detailed information on a thread. Containg the current users {@link threadUserStatus}.
 */
export interface CompleteThread extends SimpleThreadWithUserStatus {
    /** Text of the thread. */
    text: string;

    /** Posts connected to the thread. */
    posts: PageDTO<CompletePost>;
}

/**
 * A users status on a thread.
 */
export interface ThreadUserStatus {
    /** The thread user status composite id. */
    ids: {
        /** Simple thread object. */
        thread: SimpleThread;

        /** Simple user object. */
        user: SimpleUser;
    }
    /** Is a user watching the thread. */
    isWatching: boolean;

    /** Did the user block a a given thread. */
    isBlocked: boolean;
}

/** Body used during the creation of a new thread. */
export interface CreateThread {
    /** Title of the thread. */
    title: string;

    /** Text of the thread. */
    text: string;

    /** Category of the thread. */
    category: ForumCategory;

    /** What tags does the new thread have. */
    tags: NestedValue<Tag[]>;
}

/** Body used during thread update. */
export interface UpdateThread extends CreateThread {
    /** What is the updated thread id. */
    threadId: number;

    /** What is the status of the updated thread. */
    status: ThreadStatus;
}