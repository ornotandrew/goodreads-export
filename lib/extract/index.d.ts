import { ReviewInfo } from './review';
import { Book } from '../parse/book';
interface Extract extends ReviewInfo {
    book: Book;
}
declare function extract(listId: number): Promise<Extract[]>;
export default extract;
