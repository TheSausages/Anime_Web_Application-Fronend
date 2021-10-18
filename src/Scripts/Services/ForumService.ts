import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods } from "./ApiService";
import { CompleteThread, CreateThread, SimpleThread, SimpleThreadPage, UpdateThread } from "../../data/Forum/Thread";
import { CompletePost, CompletePostPage, CreatePost, PostUserStatus, UpdatePost } from "../../data/Forum/Post";
import { PageDTO } from "../../data/General/PageDTO";
import { Tag } from "../../data/Forum/Tag";
import { BackendProperties } from "../../Properties/BackendProperties";

export class ForumService {
    static getForumCategories(): Promise<ForumCategory[]> {
        return performRequestWithType<ForumCategory[]>(HttpMethods.GET, BackendProperties.forum.getForumCategories, true)
    }

    static getNewestThreads(page: number): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.GET, BackendProperties.forum.getNewestThread(page), true)
    }

    static searchThreadsByQuery(query: ForumQuery, page: number): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.POST, BackendProperties.forum.searchThreadsByQuery(page), true, query)
    }

    static getThreadById(id: number): Promise<CompleteThread> {
        return performRequestWithType<CompleteThread>(HttpMethods.GET, BackendProperties.forum.getThreadById(id), true);
    }

    static getPostsForThread(threadId: number, page: number): Promise<CompletePostPage> {
        return performRequestWithType<CompletePostPage>(HttpMethods.GET, BackendProperties.forum.getPostsForThread(threadId, page), true);
    }

    static updatePostUserStatus(postId: number, status: PostUserStatus): Promise<PostUserStatus> {
        return performRequestWithType<PostUserStatus>(HttpMethods.PUT, BackendProperties.forum.updatePostUserStatus(postId), true, status);
    }

    static createPostForThread(threadId: number, post: CreatePost): Promise<PageDTO<CompletePost>> {
        return performRequestWithType<PageDTO<CompletePost>>(HttpMethods.POST, BackendProperties.forum.createPostForThread(threadId), true, post)
    }

    static updatePostForThread(threadId: number, post: UpdatePost): Promise<CompletePost> {
        return performRequestWithType<CompletePost>(HttpMethods.PUT, BackendProperties.forum.updatePostForThread(threadId), true, post)
    }

    static createThread(thread: CreateThread): Promise<any> {
        return performRequestWithType<SimpleThread>(HttpMethods.POST, BackendProperties.forum.createThread, true, thread);
    }

    static updateThread(threadId: number, thread: UpdateThread): Promise<any> {
        return performRequestWithType<CompleteThread>(HttpMethods.PUT, BackendProperties.forum.updateThread(threadId), true, thread);
    }

    static getTags(): Promise<Tag[]> {
        return performRequestWithType<Tag[]>(HttpMethods.GET, BackendProperties.forum.getTags, true)
    }
}