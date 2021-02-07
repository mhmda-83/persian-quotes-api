import mongoose from 'mongoose';
import { Inject, InjectValue } from 'typescript-ioc';

import { Config, Logger } from '../config';
import { QuoteState } from '../data/quote';
import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { Quote } from '../model/quote';
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

  public async seed(data: Quote[]): Promise<void> {
    const documentsCount = await MongooseQuoteModel.countDocuments();

    if (documentsCount === 0) {
      await MongooseQuoteModel.create(data);
    }
  }

  public async getAll(options: QueryOptions): Promise<Quote[]> {
    const quotes = await MongooseQuoteModel.find().setOptions(options);
    return quotes;
  }

  public async getCount(): Promise<number> {
    const count = await MongooseQuoteModel.countDocuments();

    return count;
  }

  public async getById(id: string): Promise<Quote | null> {
    const quote = await MongooseQuoteModel.findById(id);
    return quote;
  }

  public async getRandom(): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;

    return quote;
  }

  public async getCategories(): Promise<{
    original: string[];
    translated: string[];
  }> {
    const translatedAggregationResult = await MongooseQuoteModel.aggregate([
      { $unwind: '$translated.categories' },
      { $group: { _id: '$translated.categories' } },
    ]);
    const originalAggregationResult = await MongooseQuoteModel.aggregate([
      { $unwind: '$original.categories' },
      { $group: { _id: '$original.categories' } },
    ]);

    let translatedCategories: string[] = translatedAggregationResult.map(
      (aggregateResult) => aggregateResult._id,
    );

    translatedCategories = Array.from(new Set(translatedCategories));

    let originalCategories: string[] = originalAggregationResult.map(
      (aggregateResult) => aggregateResult._id,
    );

    originalCategories = Array.from(new Set(originalCategories));

    return { original: originalCategories, translated: translatedCategories };
  }

  public async getCategoriesCount(): Promise<number> {
    const categories = await this.getCategories();

    return categories.translated.length ?? 0;
  }

  public async getByCategory(
    category: string,
    options: QueryOptions,
  ): Promise<Quote[] | null> {
    const quotes = await MongooseQuoteModel.find({
      $or: [
        { 'translated.categories': category },
        { 'original.categories': category },
      ],
    }).setOptions(options);

    return quotes;
  }

  public async getCountByCategory(category: string): Promise<number> {
    const count = await MongooseQuoteModel.find({
      $or: [
        { 'translated.categories': category },
        { 'original.categories': category },
      ],
    }).countDocuments();

    return count;
  }

  public async getRandomByCategory(category: string): Promise<Quote | null> {
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
    const translatedAggregationResult = await MongooseQuoteModel.aggregate([
      { $group: { _id: '$translated.author' } },
    ]);

    const originalAggregationResult = await MongooseQuoteModel.aggregate([
      { $group: { _id: '$original.author' } },
    ]);

    const translatedAuthors: string[] = translatedAggregationResult
      .filter((aggregateResult) => aggregateResult._id != null)
      .map((aggregateResult) => aggregateResult._id);

    const originalAuthors: string[] = originalAggregationResult.map(
      (aggregateResult) => aggregateResult._id,
    );

    return { original: originalAuthors, translated: translatedAuthors };
  }

  public async getAuthorsCount(): Promise<number> {
    const authors = await this.getAuthors();

    return authors.translated.length ?? 0;
  }

  public async getByAuthor(
    author: string,
    options: QueryOptions,
  ): Promise<Quote[]> {
    const quotes = await MongooseQuoteModel.find({
      $or: [{ 'translated.author': author }, { 'original.author': author }],
    }).setOptions(options);

    return quotes;
  }

  public async getCountByAuthor(author: string): Promise<number> {
    const count = await MongooseQuoteModel.find({
      $or: [{ 'translated.author': author }, { 'original.author': author }],
    }).countDocuments();

    return count;
  }

  public async getRandomByAuthor(author: string): Promise<Quote | null> {
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

  public async insertOne(quote: Quote): Promise<Quote | null> {
    const insertedQuote = await MongooseQuoteModel.create(quote);

    return insertedQuote;
  }

  public async updateById(
    quoteId: string,
    newQuote: Partial<Quote>,
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
    condition: Partial<Quote>,
  ): Promise<Quote | null> {
    const [quote] = await MongooseQuoteModel.aggregate([
      { $match: condition },
      { $sample: { size: 1 } },
    ]);
    return quote;
  }

  public async resetById(docId: string): Promise<Quote | null> {
    const reseted = await this.updateById(docId, {
      state: QuoteState.NOT_TRANSLATED,
      translated: { categories: [] },
    });
    return reseted;
  }

  public async deleteAll(): Promise<void> {
    await MongooseQuoteModel.deleteMany({});
  }
}

export default MongooseQuoteRepo;
