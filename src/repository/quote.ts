import { Quote } from '../model/quote';

export interface QueryOptions {
  limit?: number;
  skip?: number;
}
abstract class QuoteRepo {
  connect: () => void;

  seed: (data: Quote[]) => Promise<void>;

  getRandomTranslatedByAuthor: (authorName: string) => void;

  getAllTranslatedByAuthor: (authorName: string, options: QueryOptions) => void;

  getCountByTranslatedAuthor: (authorName: string) => void;

  getRandomTranslatedByCategory: (categoryName: string) => void;

  getTranslatedByCategory: (
    categoryName: string,
    options: QueryOptions,
  ) => void;

  getTranslatedCountByCategory: (categoryName: string) => void;

  getAllTranslated: (options: QueryOptions) => void;

  getAllTranslatedCount: () => void;

  getTranslatedById: (id: string) => void;

  getRandomTranslated: () => void;

  getAll: (options: QueryOptions) => Promise<Quote[]>;

  getCount: () => Promise<number>;

  getById: (id: string) => Promise<Quote | null>;

  getRandom: () => Promise<Quote | null>;

  getCategories: () => Promise<{
    original: string[];
    translated: string[];
  }>;

  getCategoriesCount: () => Promise<number>;

  getByCategory: (
    category: string,
    options: QueryOptions,
  ) => Promise<Quote[] | null>;

  getCountByCategory: (category: string) => Promise<number>;

  getRandomByCategory: (category: string) => Promise<Quote | null>;

  getAuthors: () => Promise<{
    original: string[];
    translated: string[];
  }>;

  getAuthorsCount: () => Promise<number>;

  getByAuthor: (author: string, options: QueryOptions) => Promise<Quote[]>;

  getRandomByAuthor: (author: string) => Promise<Quote | null>;

  getRandomByField: (condition: Partial<Quote>) => Promise<Quote | null>;

  insertOne: (quote: Quote) => Promise<Quote | null>;

  updateById: (
    quoteId: string,
    newQuote: Partial<Quote>,
  ) => Promise<Quote | null>;

  removeById: (quoteId: string) => Promise<boolean>;

  resetById: (quoteId: string) => Promise<Quote | null>;

  deleteAll: () => Promise<void>;
}

export default QuoteRepo;
