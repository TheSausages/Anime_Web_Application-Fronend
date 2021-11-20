/**
 * Information on the page of information (ex. {@link MediaB}) recieved from the Anilist service.
 */
export interface PageInfo {
    /** Total number of pages. */
    total?: number

    /** Number of elements per page. */
    perPage?: number

    /** The current page number. */
    currentPage?: number

    /** Is this the last page? */
    lastPage?: number

    /** Does the page have a next one? */
    hasNextPage?: boolean
}