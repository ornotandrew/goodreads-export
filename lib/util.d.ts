import cliProgress from 'cli-progress';
export declare const multibar: cliProgress.MultiBar;
export declare const barOptions: (description: string, emoji: string) => {
    description: string;
};
export declare const exit: (error?: Error) => never;
