/**
 * An interface for the 'PageDTO' object from backend.
 * is a representation for Springs doimain Page object.
 */
export interface PageDTO<T> {
    /** Content of the page. */
    content: T[];

    /** Number of elements on the page. */
    numberOfElements: number;

    /** Size of the page. */
    pageSize: number;

    /** Number of the current Page. */
    pageNumber: number;

    /** Total number of pages of a given size. */
    totalPages: number;

    /** Is this the last page? */
    last: boolean;

    /** Is the page empty? */
    empty: boolean;
}