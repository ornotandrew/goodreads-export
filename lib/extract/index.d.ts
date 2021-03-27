import { ReviewInfo } from './review';
import { Book } from '../parse/book';
import { Author } from '../parse/author';
import cliProgress from 'cli-progress';
interface Extract extends ReviewInfo {
    book: Book;
    author: Author;
}
declare function extract(listId: number, multibar: cliProgress.MultiBar): Promise<Extract[]>;
export default extract;
