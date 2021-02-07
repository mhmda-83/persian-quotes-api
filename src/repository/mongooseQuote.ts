import mongoose from 'mongoose';
import { Inject, InjectValue } from 'typescript-ioc';

import { Config, Logger } from '../config';
import { QuoteState } from '../data/quote';
import { QuoteMapper } from '../mapper/quoteMapper';
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

  public async getRandomTranslatedByAuthor(
    authorName: string,
  ): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      {
        $match: {
          'translated.author': authorName,
        },
      },
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;
    console.log(quote);
    return QuoteMapper.toDomain(quote);
  }

  public async getAllTranslatedByAuthor(
    authorName: string,
    options: QueryOptions,
  ): Promise<Quote[]> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.find({
      'translated.author': authorName,
    }).setOptions(options);

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getCountByTranslatedAuthor(authorName: string): Promise<number> {
    const count = await MongooseQuoteModel.find({
      'translated.author': authorName,
    }).countDocuments();

    return count;
  }

  public async getRandomTranslatedByCategory(
    categoryName: string,
  ): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      {
        $match: { 'translated.categories': categoryName },
      },
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;

    return QuoteMapper.toDomain(quote);
  }

  public async getTranslatedByCategory(
    categoryName: string,
    options: QueryOptions,
  ): Promise<Quote[]> {
    const quotes = await MongooseQuoteModel.find({
      'translated.categories': categoryName,
    }).setOptions(options);

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getTranslatedCountByCategory(
    categoryName: string,
  ): Promise<number> {
    const count = await MongooseQuoteModel.find({
      'translated.categories': categoryName,
    }).countDocuments();

    return count;
  }

  public async getAllTranslated(options: QueryOptions): Promise<Quote[]> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.find({
      state: QuoteState.VERIFIED,
    }).setOptions(options);

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getAllTranslatedCount(): Promise<number> {
    const count = await MongooseQuoteModel.find({
      state: QuoteState.VERIFIED,
    })
      .countDocuments()
      .lean();
    return count;
  }

  public async getTranslatedById(id: string): Promise<Quote | null> {
    const quote: MongooseQuoteDoc = await MongooseQuoteModel.findOne({
      _id: id,
      state: QuoteState.VERIFIED,
    }).lean();

    return QuoteMapper.toDomain(quote);
  }

  public async getRandomTranslated(): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $match: { state: QuoteState.VERIFIED } },
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;

    return QuoteMapper.toDomain(quote);
  }

  public async getAll(options: QueryOptions): Promise<Quote[]> {
    const quotes = await MongooseQuoteModel.find().setOptions(options);
    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getCount(): Promise<number> {
    const count = await MongooseQuoteModel.countDocuments();

    return count;
  }

  public async getById(id: string): Promise<Quote | null> {
    const quote = await MongooseQuoteModel.findById(id);
    return QuoteMapper.toDomain(quote);
  }

  public async getRandom(): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;

    return QuoteMapper.toDomain(quote);
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

    return quotes.map<Quote>(QuoteMapper.toDomain);
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

    return QuoteMapper.toDomain(quote);
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

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getTranslatedCountByAuthor(author: string): Promise<number> {
    const count = await MongooseQuoteModel.find({
      'translated.author': author,
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

    return QuoteMapper.toDomain(quote);
  }

  public async insertOne(quote: Quote): Promise<Quote | null> {
    const insertedQuote = await MongooseQuoteModel.create(quote);

    return QuoteMapper.toDomain(insertedQuote);
  }

  public async updateById(
    quoteId: string,
    newQuote: Partial<Quote>,
  ): Promise<Quote | null> {
    const quote = await MongooseQuoteModel.findByIdAndUpdate(
      quoteId,
      newQuote,
      { returnOriginal: false, useFindAndModify: false },
    );
    return QuoteMapper.toDomain(quote);
  }

  public async removeById(quoteId: string): Promise<boolean> {
    const removedDoc = await MongooseQuoteModel.findByIdAndRemove(quoteId, {
      useFindAndModify: false,
    });
    return Boolean(removedDoc);
  }

  public async getRandomByField(
    condition: Partial<Quote>,
  ): Promise<Quote | null> {
    const [quote = null] = await MongooseQuoteModel.aggregate([
      { $match: condition },
      { $sample: { size: 1 } },
    ]);
    return QuoteMapper.toDomain(quote);
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
