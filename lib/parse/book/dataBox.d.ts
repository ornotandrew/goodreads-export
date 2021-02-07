export interface DataBoxValues {
    title: string;
    seriesUrl?: string;
}
export default function getDataBoxValues(html: string): DataBoxValues;
