import { MongooseQuoteDoc } from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';

export interface QueryOptions {
  limit?: number;
  skip?: number;
}
interface QuoteRepo {
  getAll: (options: QueryOptions) => Promise<TranslatedQuote[] | null>;

  getCount: () => Promise<number>;

  getById: (id: string) => Promise<TranslatedQuote | null>;

  getRandom: () => Promise<TranslatedQuote | null>;

  getCategories: () => Promise<string[] | null>;

  getCategoriesCount: () => Promise<number>;

  getByCategory: (
    category: string,
    options: QueryOptions,
  ) => Promise<TranslatedQuote[] | null>;

  getRandomByCategory: (category: string) => Promise<TranslatedQuote | null>;

  getAuthors: () => Promise<string[] | null>;

  getAuthorsCount: () => Promise<number>;

  getByAuthor: (
    author: string,
    options: QueryOptions,
  ) => Promise<TranslatedQuote[] | null>;

  getRandomByAuthor: (author: string) => Promise<TranslatedQuote | null>;

  insertOne: (quote: TranslatedQuote) => Promise<MongooseQuoteDoc | null>;
}

export default QuoteRepo;
