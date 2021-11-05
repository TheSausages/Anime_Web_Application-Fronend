import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods } from "./ApiService";
import { CompleteThread, CreateThread, SimpleThread, SimpleThreadPage, ThreadUserStatus, UpdateThread } from "../../data/Forum/Thread";
import { CompletePost, CompletePostPage, CreatePost, PostUserStatus, UpdatePost } from "../../data/Forum/Post";
import { PageDTO } from "../../data/General/PageDTO";
import { Tag } from "../../data/Forum/Tag";
import { BackendProperties } from "../../Properties/BackendProperties";
import { TFunction } from "react-i18next";
import { i18n } from "i18next";

export class ForumService {
    static getForumCategories(t: TFunction, i18n: i18n): Promise<ForumCategory[]> {
        return performRequestWithType<ForumCategory[]>(HttpMethods.GET, BackendProperties.forum.getForumCategories, true, t, i18n)
    }

    static getNewestThreads(page: number, t: TFunction, i18n: i18n): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.GET, BackendProperties.forum.getNewestThread(page), true, t, i18n)
    }

    static searchThreadsByQuery(query: ForumQuery, page: number, t: TFunction, i18n: i18n): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.POST, BackendProperties.forum.searchThreadsByQuery(page), true, t, i18n, query)
    }

    static getThreadById(id: number, t: TFunction, i18n: i18n): Promise<CompleteThread> {
        return performRequestWithType<CompleteThread>(HttpMethods.GET, BackendProperties.forum.getThreadById(id), true, t, i18n);
    }

    static getPostsForThread(threadId: number, page: number, t: TFunction, i18n: i18n): Promise<CompletePostPage> {
        return performRequestWithType<CompletePostPage>(HttpMethods.GET, BackendProperties.forum.getPostsForThread(threadId, page), true, t, i18n);
    }

    static updatePostUserStatus(postId: number, status: PostUserStatus, t: TFunction, i18n: i18n): Promise<PostUserStatus> {
        return performRequestWithType<PostUserStatus>(HttpMethods.PUT, BackendProperties.forum.updatePostUserStatus(postId), true, t, i18n, status);
    }

    static createPostForThread(threadId: number, post: CreatePost, t: TFunction, i18n: i18n): Promise<PageDTO<CompletePost>> {
        return performRequestWithType<PageDTO<CompletePost>>(HttpMethods.POST, BackendProperties.forum.createPostForThread(threadId), true, t, i18n, post)
    }

    static updatePostForThread(threadId: number, post: UpdatePost, t: TFunction, i18n: i18n): Promise<CompletePost> {
        return performRequestWithType<CompletePost>(HttpMethods.PUT, BackendProperties.forum.updatePostForThread(threadId), true, t, i18n, post)
    }

    static createThread(thread: CreateThread, t: TFunction, i18n: i18n): Promise<any> {
        return performRequestWithType<SimpleThread>(HttpMethods.POST, BackendProperties.forum.createThread, true, t, i18n, thread);
    }

    static updateThread(threadId: number, thread: UpdateThread, t: TFunction, i18n: i18n): Promise<any> {
        return performRequestWithType<CompleteThread>(HttpMethods.PUT, BackendProperties.forum.updateThread(threadId), true, t, i18n, thread);
    }

    static updateThreadUserStatus(threadId: number, status: ThreadUserStatus, t: TFunction, i18n: i18n): Promise<ThreadUserStatus> {
        return performRequestWithType<ThreadUserStatus>(HttpMethods.PUT, BackendProperties.forum.updateThreadUserStatus(threadId), true, t, i18n, status);
    }

    static getTags(t: TFunction, i18n: i18n): Promise<Tag[]> {
        return performRequestWithType<Tag[]>(HttpMethods.GET, BackendProperties.forum.getTags, true, t, i18n)
    }
}