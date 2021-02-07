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

  getById: (id: string) => Promise<Quote | null>;

  getCategories: () => Promise<string[]>;

  getAuthors: () => Promise<string[]>;

  getRandomByField: (condition: Partial<Quote>) => Promise<Quote | null>;

  updateById: (
    quoteId: string,
    newQuote: Partial<Quote>,
  ) => Promise<Quote | null>;

  resetById: (quoteId: string) => Promise<Quote | null>;

  deleteAll: () => Promise<void>;
}

export default QuoteRepo;
