import { ForumCategory } from "./ForumCategory";

/** Forum categories not present in backend, that are added to the forum list. */
export const AdditionalForumCategories: ForumCategory[] = [
    {categoryId: -1, categoryName: "Newest", categoryDescription: "See the newest threads"},
    {categoryId: 0, categoryName: "Search", categoryDescription: "Search threads from the forum"},
]