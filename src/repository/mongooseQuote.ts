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
    const aggregationResult = await MongooseQuoteModel.aggregate([
      { $unwind: '$translated.categories' },
      { $group: { _id: '$translated.categories' } },
    ]);

    let categories: string[] = aggregationResult.map(
      (aggregateResult) => aggregateResult._id,
    );
    // quotes.forEach((quote) => categories.push(...quote.translated.categories));

    categories = Array.from(new Set(categories));

    return categories;
  }

  public async getCategoriesCount() {
    const categories = await this.getCategories();

    return categories.length;
  }

  public async getByCategory(category: string, options: QueryOptions) {
    const quotes = await MongooseQuoteModel.find({
      $or: [
        { 'translated.categories': category },
        { 'original.categories': category },
      ],
    }).setOptions(options);

    return quotes;
  }

  public async getByCategoryCount(category: string) {
    const count = await MongooseQuoteModel.find({
      $or: [
        { 'translated.categories': category },
        { 'original.categories': category },
      ],
    }).countDocuments();

    return count;
  }

  public async getRandomByCategory(category: string) {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      {
        $match: {
          $or: [
            { 'translated.categories': category },
            { 'original.categories': category },
          ],
        },
      },
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async getAuthors() {
    const aggregationResult = await MongooseQuoteModel.aggregate([
      { $group: { _id: '$translated.author' } },
    ]);

    const authors: string[] = aggregationResult.map(
      (aggregateResult) => aggregateResult._id,
    );

    return authors;
  }

  public async getAuthorsCount() {
    const authors = await this.getAuthors();

    return authors.length;
  }

  public async getByAuthor(author: string, options: QueryOptions) {
    const quotes = await MongooseQuoteModel.find({
      $or: [{ 'translated.author': author }, { 'original.author': author }],
    }).setOptions(options);

    return quotes;
  }

  public async getByAuthorCount(author: string) {
    const count = await MongooseQuoteModel.find({
      $or: [{ 'translated.author': author }, { 'original.author': author }],
    }).countDocuments();

    return count;
  }

  public async getRandomByAuthor(author: string) {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      {
        $match: {
          $or: [{ 'translated.author': author }, { 'original.author': author }],
        },
      },
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
