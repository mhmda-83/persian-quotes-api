import { TranslatedQuote } from '../model/translatedQuote';

export interface QueryOptions {
  limit?: number;
  skip?: number;
}
abstract class QuoteRepo {
  connect: () => void;

  seed: (data: TranslatedQuote[]) => Promise<void>;

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

  getCountByCategory: (category: string) => Promise<number>;

  getRandomByCategory: (category: string) => Promise<TranslatedQuote | null>;

  getAuthors: () => Promise<string[] | null>;

  getAuthorsCount: () => Promise<number>;

  getByAuthor: (
    author: string,
    options: QueryOptions,
  ) => Promise<TranslatedQuote[] | null>;

  getCountByAuthor: (author: string) => Promise<number>;

  getRandomByAuthor: (author: string) => Promise<TranslatedQuote | null>;
  getRandomByField: (
    condition: Partial<TranslatedQuote>,
  ) => Promise<TranslatedQuote | null>;

  insertOne: (quote: TranslatedQuote) => Promise<TranslatedQuote | null>;

  updateById: (
    quoteId: string,
    newQuote: Partial<TranslatedQuote>,
  ) => Promise<TranslatedQuote | null>;

  removeById: (quoteId: string) => Promise<boolean>;

  resetById: (quoteId: string) => Promise<TranslatedQuote | null>;
}

export default QuoteRepo;
