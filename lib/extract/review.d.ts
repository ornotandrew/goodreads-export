export declare const getAllReviewIds: (arg: number, ...rest: any[]) => Promise<number[]>;
interface ReviewInfoTimeline {
    shelved: string;
    started?: string;
    finished?: string;
    progress: {
        percent: number;
        date: string;
    }[];
}
export interface ReviewInfo {
    reviewId: number;
    bookUrl: string;
    timeline: ReviewInfoTimeline;
}
export declare const getReviewInfo: (arg: number, ...rest: any[]) => Promise<ReviewInfo>;
export {};
