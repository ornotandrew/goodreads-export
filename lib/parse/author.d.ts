export declare type Author = {
    name: string;
    birthDate: string;
    deathDate?: string;
    genres?: string[];
    websiteUrl?: string;
    twitterUrl?: string;
};
export declare function author(html: string): Author;
