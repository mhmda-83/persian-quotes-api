import { MongooseQuoteDoc } from '../model/mongooseQuoteModel';
import { Quote } from '../model/quote';

interface QuoteRepo {
  getById: (
    id: string,
  ) => Promise<{ original: Quote; translated: Quote } | null>;

  getRandom: () => Promise<{ original: Quote; translated: Quote } | null>;

  getCategories: () => Promise<string[] | null>;

  getByCategory: (
    category: string,
  ) => Promise<{ original: Quote; translated: Quote }[] | null>;

  getRandomByCategory: (
    category: string,
  ) => Promise<{ original: Quote; translated: Quote } | null>;

  getAuthors: () => Promise<string[] | null>;

  getByAuthor: (
    author: string,
  ) => Promise<{ original: Quote; translated: Quote }[] | null>;

  getRandomByAuthor: (
    author: string,
  ) => Promise<{ original: Quote; translated: Quote } | null>;

  insertOne: (quote: {
    original: Quote;
    translated: Quote;
  }) => Promise<MongooseQuoteDoc | null>;
}

export default QuoteRepo;
