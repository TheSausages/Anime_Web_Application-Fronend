/**
 * Interface representing the forum categories for threads.
 */
export interface ForumCategory {
    /** Id of the category. */
    categoryId: number;

    /** Name of the category. */
    categoryName: string;

    /** The categories description. */
    categoryDescription: string;
}