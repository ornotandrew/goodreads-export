export declare function getReviewIdsForPage(listId: number, page: number): Promise<{
    reviewIds: number[];
    progress: string;
    isLastPage: boolean;
}>;
export declare function getAllReviewIds(listId: number): Promise<number[]>;
export declare function getReviewInfo(reviewId: number): Promise<{
    timeline: {};
}>;
declare function extract(listId: number): Promise<object[]>;
export default extract;
