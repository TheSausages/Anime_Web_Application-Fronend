import { NestedValue } from "react-hook-form";
import { PageDTO } from "../General/PageDTO";
import { SimpleUser } from "../General/User/SimpleUser";
import { ForumCategory } from "./ForumCategory";
import { CompletePost } from "./Post";
import { Tag } from "./Tag";
import { ThreadStatus } from "./Types";

/**
 * Because the ThreadUserStatus field is being ignored during serialziation/deserialization in backend
 * we need to get rid of it for ThreadReactionForm - 
 * TODO: find a better way
*/
export interface SimpleThreadWithoutUserStatus {
    threadId: number;
    title: string;
    nrOfPosts: number;
    status: ThreadStatus;
    category: ForumCategory;
    creation: string;
    modification: string;
    creator: SimpleUser;
    tags: Tag[];
}

export interface SimpleThread extends SimpleThreadWithoutUserStatus {
    threadUserStatus: ThreadUserStatus;
}

export interface SimpleThreadPage extends PageDTO<SimpleThread> {}

export interface CompleteThread extends SimpleThread {
    text: string;
    posts: PageDTO<CompletePost>;
}

export interface ThreadUserStatus {
    ids: {
        thread: SimpleThreadWithoutUserStatus;
        user: SimpleUser;
    }
    isWatching: boolean;
    isBlocked: boolean;
}

export interface CreateThread {
    title: string;
    text: string;
    category: ForumCategory;
    tags: NestedValue<Tag[]>;
}

export interface UpdateThread extends CreateThread {
    threadId: number;
    status: ThreadStatus;
}