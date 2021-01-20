import { Author } from './author';
import { Category } from './category';

export interface Quote {
  text: string;
  categories: Category[];
  author: Author;
}
