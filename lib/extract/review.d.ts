import cliProgress from 'cli-progress';
export declare function getAllReviewIds(listId: number, multibar: cliProgress.MultiBar): Promise<number[]>;
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
export declare function getReviewInfo(reviewId: number): Promise<ReviewInfo>;
export {};
