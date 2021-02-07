export interface Book {
    title: string;
    authorUrl: string;
    description: string;
    imageUrl: string;
    isbn: number;
    pageCount: number;
    seriesUrl?: string;
}
export declare function book(html: string): Book;
