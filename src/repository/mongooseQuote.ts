import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';
import QuoteRepo from './quote';

class MongooseQuoteRepo implements QuoteRepo {
  public async getAll() {
    const quotes = await MongooseQuoteModel.find();

    return quotes;
  }

  public async getById(id: string) {
    const quote = await MongooseQuoteModel.findById(id);
    return quote;
  }

  public async getRandom() {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async getCategories() {
    const quotes = await MongooseQuoteModel.find();

    let categories: string[] = [];
    quotes.forEach((quote) => categories.push(...quote.translated.categories));

    categories = Array.from(new Set(categories));

    return categories;
  }

  public async getByCategory(category: string) {
    const quotes = await MongooseQuoteModel.find({
      'translated.categories': category,
    });

    return quotes;
  }

  public async getRandomByCategory(category: string) {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $match: { 'translated.categories': category } },
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async getAuthors() {
    const quotes = await MongooseQuoteModel.find();
    const authors: string[] = quotes.map((quote) => quote.translated.author);

    return authors;
  }

  public async getByAuthor(author: string) {
    const quotes = await MongooseQuoteModel.find({
      'translated.author': author,
    });

    return quotes;
  }

  public async getRandomByAuthor(author: string) {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $match: { 'translated.author': author } },
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async insertOne(quote: TranslatedQuote) {
    const insertedQuote = await MongooseQuoteModel.create(quote);

    return insertedQuote;
  }
}

export default MongooseQuoteRepo;
