import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';
import QuoteRepo, { QueryOptions } from './quote';

class MongooseQuoteRepo implements QuoteRepo {
  public async getAll(options: QueryOptions): Promise<TranslatedQuote[]> {
    const quotes = await MongooseQuoteModel.find().setOptions(options);
    return quotes;
  }

  public async getCount(): Promise<number> {
    const count = await MongooseQuoteModel.countDocuments();

    return count;
  }

  public async getById(id: string): Promise<TranslatedQuote | null> {
    const quote = await MongooseQuoteModel.findById(id);
    return quote;
  }

  public async getRandom(): Promise<TranslatedQuote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async getCategories(): Promise<string[]> {
    const quotes = await MongooseQuoteModel.find();

    let categories: string[] = [];
    quotes.forEach((quote) => categories.push(...quote.translated.categories));

    categories = Array.from(new Set(categories));

    return categories;
  }

  public async getCategoriesCount(): Promise<number> {
    const categories = await this.getCategories();

    return categories?.length ?? 0;
  }

  public async getByCategory(
    category: string,
    options: QueryOptions,
  ): Promise<TranslatedQuote[] | null> {
    const quotes = await MongooseQuoteModel.find({
      'translated.categories': category,
    }).setOptions(options);

    return quotes;
  }

  public async getRandomByCategory(
    category: string,
  ): Promise<TranslatedQuote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $match: { 'translated.categories': category } },
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async getAuthors(): Promise<string[]> {
    const quotes = await MongooseQuoteModel.find();
    const authors: string[] = quotes.map((quote) => quote.translated.author);

    return authors;
  }

  public async getAuthorsCount(): Promise<number> {
    const authors = await this.getAuthors();

    return authors?.length ?? 0;
  }

  public async getByAuthor(
    author: string,
    options: QueryOptions,
  ): Promise<TranslatedQuote[] | null> {
    const quotes = await MongooseQuoteModel.find({
      'translated.author': author,
    }).setOptions(options);

    return quotes;
  }

  public async getRandomByAuthor(
    author: string,
  ): Promise<TranslatedQuote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $match: { 'translated.author': author } },
      { $sample: { size: 1 } },
    ]);

    const [quote] = quotes;

    return quote;
  }

  public async insertOne(
    quote: TranslatedQuote,
  ): Promise<TranslatedQuote | null> {
    const insertedQuote = await MongooseQuoteModel.create(quote);

    return insertedQuote;
  }

  public async updateById(
    quoteId: string,
    newQuote: Partial<TranslatedQuote>,
  ): Promise<MongooseQuoteDoc | null> {
    const updatedQuote = await MongooseQuoteModel.findByIdAndUpdate(
      quoteId,
      newQuote,
      { returnOriginal: false, useFindAndModify: false },
    );
    return updatedQuote;
  }

  public async removeById(quoteId: string): Promise<boolean> {
    const removedDoc = await MongooseQuoteModel.findByIdAndRemove(quoteId, {
      useFindAndModify: false,
    });
    if (removedDoc) {
      return true;
    }
    return false;
  }
}

export default MongooseQuoteRepo;
