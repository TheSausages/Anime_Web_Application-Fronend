export interface PageDTO<T> {
    content: T[];
    numberOfElements: number;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
    last: boolean;
    empty: boolean;
}