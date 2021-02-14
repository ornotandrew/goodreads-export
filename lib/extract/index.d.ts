import { ReviewInfo } from './review';
import { Book } from '../parse/book';
import cliProgress from 'cli-progress';
interface Extract extends ReviewInfo {
    book: Book;
}
declare function extract(listId: number, multibar: cliProgress.MultiBar): Promise<Extract[]>;
export default extract;
