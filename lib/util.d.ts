import cliProgress from 'cli-progress';
export declare const multibar: cliProgress.MultiBar;
export declare const barOptions: (description: string, emoji: string) => {
    description: string;
};
export declare const exit: (error?: Error) => never;
export declare function asyncMemo<A, R>(fn: (arg: A, ...rest: any[]) => Promise<R>): (arg: A, ...rest: any[]) => Promise<R>;
export declare function batchedPromiseAll<A, R>(fn: (...args: A[]) => Promise<R>, args: A[][], batchSize: number): Promise<R[]>;
