import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';
import QuoteRepo, { QueryOptions } from './quote';

class MongooseQuoteRepo implements QuoteRepo {
  public async getAll(options: QueryOptions) {
    const quotes = await MongooseQuoteModel.find().setOptions(options);

    return quotes;
  }

  public async getCount() {
    const count = await MongooseQuoteModel.countDocuments();

    return count;
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

  public async getCategoriesCount() {
    const categories = await this.getCategories();

    return categories.length;
  }

  public async getByCategory(category: string, options: QueryOptions) {
    const quotes = await MongooseQuoteModel.find({
      'translated.categories': category,
    }).setOptions(options);

    return quotes;
  }

  public async getByCategoryCount(category: string) {
    const count = await MongooseQuoteModel.find({
      'translated.categories': category,
    }).countDocuments();

    return count;
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

  public async getAuthorsCount() {
    const authors = await this.getAuthors();

    return authors.length;
  }

  public async getByAuthor(author: string, options: QueryOptions) {
    const quotes = await MongooseQuoteModel.find({
      'translated.author': author,
    }).setOptions(options);

    return quotes;
  }

  public async getByAuthorCount(author: string) {
    const count = await MongooseQuoteModel.find({
      'translated.author': author,
    }).countDocuments();

    return count;
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
