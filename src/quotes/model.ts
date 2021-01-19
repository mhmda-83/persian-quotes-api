import { Category } from '../categories/model';
import { Author } from '../authors/model';

export interface Quote {
  text: string;
  categories: Category[];
  author: Author;
}
