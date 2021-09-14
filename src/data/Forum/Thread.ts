import { PageDTO } from "../General/PageDTO";
import { SimpleUser } from "../General/User/SimpleUser";
import { ForumCategory } from "./ForumCategory";
import { CompletePost } from "./Post";
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
    creator: SimpleUser;
    tags: Tag[];
}

export interface SimpleThreadPage extends PageDTO<SimpleThread> {}

export interface CompleteThread extends SimpleThread {
    text: string;
    posts: PageDTO<CompletePost>;
}