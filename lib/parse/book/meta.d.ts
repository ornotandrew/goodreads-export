export interface MetaValues {
    description: string;
    imageUrl: string;
    authorUrl: string;
    isbn: number;
    pageCount: number;
}
export default function getMetaValues(html: string): MetaValues;
