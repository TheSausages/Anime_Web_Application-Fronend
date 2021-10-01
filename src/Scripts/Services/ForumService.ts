import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods, performRequestWithNoResponse } from "./ApiService";
import { CompleteThread, CreateThread, SimpleThread, SimpleThreadPage, UpdateThread } from "../../data/Forum/Thread";
import { CompletePost, CompletePostPage, CreatePost, PostUserStatus, UpdatePost } from "../../data/Forum/Post";
import { PageDTO } from "../../data/General/PageDTO";
import { Tag } from "../../data/Forum/Tag";

export class ForumService {
    static getForumCategories(): Promise<ForumCategory[]> {
        return performRequestWithType<ForumCategory[]>(HttpMethods.GET, "/forum/categories", true)
    }

    static getNewestThreads(page: number): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.GET, `/forum/thread/newest/${page}`, true)
    }

    static searchThreads(query: ForumQuery, page: number): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.POST, `/forum/search/${page}`, true, query)
    }

    static getThreadById(id: number): Promise<CompleteThread> {
        return performRequestWithType<CompleteThread>(HttpMethods.GET, `/forum/thread/${id}`, true);
    }

    static getPostsForThread(threadId: number, page: number): Promise<CompletePostPage> {
        return performRequestWithType<CompletePostPage>(HttpMethods.GET, `/forum/thread/${threadId}/posts/${page}`, true);
    }

    static updatePostUserStatus(postId: number, status: PostUserStatus): Promise<PostUserStatus> {
        return performRequestWithType<PostUserStatus>(HttpMethods.PUT, `/forum/post/${postId}`, true, status);
    }

    static createPostForThread(threadId: number, post: CreatePost): Promise<PageDTO<CompletePost>> {
        return performRequestWithType<PageDTO<CompletePost>>(HttpMethods.POST, `/forum/thread/${threadId}/post`, true, post)
    }

    static updatePostForThread(threadId: number, post: UpdatePost): Promise<CompletePost> {
        return performRequestWithType<CompletePost>(HttpMethods.PUT, `/forum/thread/${threadId}/post`, true, post)
    }

    static createThread(thread: CreateThread): Promise<any> {
        return performRequestWithType<SimpleThread>(HttpMethods.POST, "/forum/thread", true, thread);
    }

    static updateThread(threadId: number, thread: UpdateThread): Promise<any> {
        return performRequestWithNoResponse(HttpMethods.POST, `/forum/thread/${threadId}`, true, thread);
    }

    static getTags(): Promise<Tag[]> {
        return performRequestWithType<Tag[]>(HttpMethods.GET, '/forum/tags', true)
    }
}