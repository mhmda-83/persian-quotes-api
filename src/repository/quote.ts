import { MongooseQuoteDoc } from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';

interface QuoteRepo {
  getAll: () => Promise<TranslatedQuote[] | null>;

  getById: (id: string) => Promise<TranslatedQuote | null>;

  getRandom: () => Promise<TranslatedQuote | null>;

  getCategories: () => Promise<string[] | null>;

  getByCategory: (category: string) => Promise<TranslatedQuote[] | null>;

  getRandomByCategory: (category: string) => Promise<TranslatedQuote | null>;

  getAuthors: () => Promise<string[] | null>;

  getByAuthor: (author: string) => Promise<TranslatedQuote[] | null>;

  getRandomByAuthor: (author: string) => Promise<TranslatedQuote | null>;

  insertOne: (quote: TranslatedQuote) => Promise<MongooseQuoteDoc | null>;
}

export default QuoteRepo;
