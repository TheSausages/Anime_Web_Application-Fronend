import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods } from "./ApiService";
import { CompleteThread, SimpleThreadPage } from "../../data/Forum/Thread";
import { CompletePost, CompletePostPage, CreatePost, PostUserStatus, PutPost } from "../../data/Forum/Post";
import { PageDTO } from "../../data/General/PageDTO";

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

    static updatePostForThread(threadId: number, post: PutPost): Promise<CompletePost> {
        return performRequestWithType<CompletePost>(HttpMethods.PUT, `/forum/thread/${threadId}/post`, true, post)
    }
}