import { ForumCategory } from "../../data/Forum/ForumCategory";
import { ForumQuery } from "../../data/Forum/ForumQuery";
import { performRequestWithType, HttpMethods } from "./ApiService";
import { CompleteThread, SimpleThreadPage } from "../../data/Forum/Thread";

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
}