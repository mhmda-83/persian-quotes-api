import mongoose from 'mongoose';
import { Inject, InjectValue } from 'typescript-ioc';

import { Config, Logger } from '../config';
import { QuoteState } from '../data/quote';
import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { TranslatedQuote } from '../model/translatedQuote';
import QuoteRepo, { QueryOptions } from './quote';

class MongooseQuoteRepo implements QuoteRepo {
  @Inject private logger: Logger;
  @InjectValue('config') private config: Config;

  public connect() {
    mongoose
      .connect(this.config.databaseUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        this.logger.info('Database Connected :)');
      })
      .catch(this.logger.error);
  }

  public async seed(data: TranslatedQuote[]): Promise<void> {
    const documentsCount = await MongooseQuoteModel.countDocuments();
    this.logger.log(documentsCount);
    if (documentsCount === 0) {
      data.forEach((d) => MongooseQuoteModel.create(d));
    }
  }

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
    quotes.forEach((quote) => {
      if (quote?.translated.categories)
        categories.push(...quote.translated.categories);
    });

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
    let authors: string[] = [];
    quotes.forEach((quote) => {
      if (quote?.translated.author) authors.push(...quote.translated.author);
    });

    authors = Array.from(new Set(authors));

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

  public async getRandomByField(
    condition: Partial<TranslatedQuote>,
  ): Promise<TranslatedQuote | null> {
    const [quote] = await MongooseQuoteModel.aggregate([
      { $match: condition },
      { $sample: { size: 1 } },
    ]);
    this.logger.log(quote);
    return quote;
  }

  public async resetById(docId: string): Promise<TranslatedQuote | null> {
    const reseted = await this.updateById(docId, {
      verified: QuoteState.NOT_TRANSLATED,
      translated: { categories: [] },
    });
    return reseted;
  }
}

export default MongooseQuoteRepo;
