import { ForumCategory } from "../../data/Forum/ForumCategory";
import { performRequestWithType, HttpMethods } from "./ApiService";

export class ForumService {
    static getForumCategories(): Promise<ForumCategory[]> {
        return performRequestWithType<ForumCategory[]>(HttpMethods.GET, "/forum/categories", true)
    }
}