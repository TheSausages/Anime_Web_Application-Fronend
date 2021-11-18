import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods } from "./ApiService";
import { CompleteThread, CreateThread, SimpleThreadWithUserStatus, SimpleThreadPage, ThreadUserStatus, UpdateThread } from "../../data/Forum/Thread";
import { CompletePost, CompletePostPage, CreatePost, PostUserStatus, UpdatePost } from "../../data/Forum/Post";
import { Tag } from "../../data/Forum/Tag";
import { BackendProperties } from "../../Properties/BackendProperties";
import { TFunction } from "react-i18next";
import { i18n } from "i18next";

/**
 * Class containing methods for operations related to Forum. Should never be initialised.
 * The i18n and tranlation function must be passes down to {@link ApiService}.
 */
export abstract  class ForumService {
    /**
     * Function to get all Forum Categories found in Backend.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns List of Forum Categories.
     */
    static getForumCategories(t: TFunction, i18n: i18n): Promise<ForumCategory[]> {
        return performRequestWithType<ForumCategory[]>(HttpMethods.GET, BackendProperties.forum.getForumCategories, true, t, i18n)
    }

    /**
     * Function to get the newest Threads from the forum.
     * @param page Number of the page of the newest thread that is being requested.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Page of newest threads as {@link SimpleThread}s.
     */
    static getNewestThreads(page: number, t: TFunction, i18n: i18n): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.GET, BackendProperties.forum.getNewestThread(page), true, t, i18n)
    }

    /**
     * Function for searching threads using threads using a {@link ForumQuery}. 
     * The threads will be sorted from the newest tot he oldest.
     * @param query Query used to search the Threads.
     * @param page Page of Threads that should be returned.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Page of threads as {@link SimpleThread}s.
     */
    static searchThreadsByQuery(query: ForumQuery, page: number, t: TFunction, i18n: i18n): Promise<SimpleThreadPage> {
        return performRequestWithType<SimpleThreadPage>(HttpMethods.POST, BackendProperties.forum.searchThreadsByQuery(page), true, t, i18n, query)
    }

    /**
     * Function for getting complete information on a thread using its id.
     * @param id Id of the searched thread.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns Complete information on a thread.
     */
    static getThreadById(id: number, t: TFunction, i18n: i18n): Promise<CompleteThread> {
        return performRequestWithType<CompleteThread>(HttpMethods.GET, BackendProperties.forum.getThreadById(id), true, t, i18n);
    }

    /**
     * Function for retrieving posts connected to a thread.
     * @param threadId Id of a thread.
     * @param page Which page of posts should be returned.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns List of {@link CompletePost}s.
     */
    static getPostsForThread(threadId: number, page: number, t: TFunction, i18n: i18n): Promise<CompletePostPage> {
        return performRequestWithType<CompletePostPage>(HttpMethods.GET, BackendProperties.forum.getPostsForThread(threadId, page), true, t, i18n);
    }

    /**
     * Function for updating a user's post user status.
     * @param postId Id of the post for which the status is being updated.
     * @param status The updated status.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The updated status retuned from backend.
     */
    static updatePostUserStatus(postId: number, status: PostUserStatus, t: TFunction, i18n: i18n): Promise<PostUserStatus> {
        return performRequestWithType<PostUserStatus>(HttpMethods.PUT, BackendProperties.forum.updatePostUserStatus(postId), true, t, i18n, status);
    }

    /**
     * Create a new post, which is connected to a thread.
     * @param threadId Id of the thread for which the new post is created.
     * @param post The Post to be created.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The newly created post.
     */
    static createPostForThread(threadId: number, post: CreatePost, t: TFunction, i18n: i18n): Promise<CompletePostPage> {
        return performRequestWithType<CompletePostPage>(HttpMethods.POST, BackendProperties.forum.createPostForThread(threadId), true, t, i18n, post)
    }

    /**
     * Update a existing post.
     * @param threadId Id of the thread for which the post is updated.
     * @param post The updated post.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The updated post.
     */
    static updatePostForThread(threadId: number, post: UpdatePost, t: TFunction, i18n: i18n): Promise<CompletePost> {
        return performRequestWithType<CompletePost>(HttpMethods.PUT, BackendProperties.forum.updatePostForThread(threadId), true, t, i18n, post)
    }

    /**
     * Create a new thread.
     * @param thread Thread to be created.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The newly created thread.
     */
    static createThread(thread: CreateThread, t: TFunction, i18n: i18n): Promise<SimpleThreadWithUserStatus> {
        return performRequestWithType<SimpleThreadWithUserStatus>(HttpMethods.POST, BackendProperties.forum.createThread, true, t, i18n, thread);
    }

    /**
     * Update an existing thread.
     * @param threadId Id of the thread that is updated.
     * @param thread Updated thread.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The updated thread.
     */
    static updateThread(threadId: number, thread: UpdateThread, t: TFunction, i18n: i18n): Promise<CompleteThread> {
        return performRequestWithType<CompleteThread>(HttpMethods.PUT, BackendProperties.forum.updateThread(threadId), true, t, i18n, thread);
    }

    /**
     * Update the user status for a thread.
     * @param threadId Id of the thead for which the status is updated.
     * @param status The updated status.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns The Updated status.
     */
    static updateThreadUserStatus(threadId: number, status: ThreadUserStatus, t: TFunction, i18n: i18n): Promise<ThreadUserStatus> {
        return performRequestWithType<ThreadUserStatus>(HttpMethods.PUT, BackendProperties.forum.updateThreadUserStatus(threadId), true, t, i18n, status);
    }

    /**
     * Get all forum tags.
     * @param t Translation function.
     * @param i18n i18n instance.
     * @returns List of tags.
     */
    static getTags(t: TFunction, i18n: i18n): Promise<Tag[]> {
        return performRequestWithType<Tag[]>(HttpMethods.GET, BackendProperties.forum.getTags, true, t, i18n)
    }
}