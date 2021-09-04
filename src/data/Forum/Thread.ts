import { PageDTO } from "../General/PageDTO";
import { ForumCategory } from "./ForumCategory";
import { Tag } from "./Tag";
import { ThreadStatus } from "./Types";

export interface SimpleThread {
    threadId: number;
    title: string;
    nrOfPosts: number;
    status: ThreadStatus;
    category: ForumCategory;
    creation: string;
    modification: string;
    tags: Tag[];
}

export interface SimpleThreadPage extends PageDTO<SimpleThread> {}