export declare function getAllReviewIds(listId: number): Promise<number[]>;
export interface ReviewInfo {
    shelved: string;
    started?: string;
    finished?: string;
    progress: {
        percent: number;
        date: string;
    }[];
}
export declare function getReviewInfo(reviewId: number): Promise<{
    reviewId: number;
    timeline: ReviewInfo;
}>;
declare function extract(listId: number): Promise<object[]>;
export default extract;
