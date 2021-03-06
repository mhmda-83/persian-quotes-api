import mongoose from 'mongoose';
import { Inject, InjectValue } from 'typescript-ioc';

import { Config, Logger } from '../config';
import { QuoteState } from '../data/quote';
import { QuoteMapper } from '../mapper/quoteMapper';
import MongooseQuoteModel, {
  MongooseQuoteDoc,
} from '../model/mongooseQuoteModel';
import { Quote } from '../model/quote';
import { QueryOptions } from './queryOptions';
import QuoteRepo from './quoteRepo';

class MongooseQuoteRepo implements QuoteRepo {
  @Inject private logger: Logger;
  @InjectValue('config') private config: Config;

  public connect() {
    mongoose
      .connect(this.config.databaseUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        this.logger.info('connected to database successfully ⚙');
      })
      .catch((err) => {
        this.logger.info(
          'following error occurred while connecting to database ❌:',
        );
        this.logger.error(err);
      });
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
          state: QuoteState.VERIFIED,
        },
      },
      { $sample: { size: 1 } },
    ]);

    const [quote = null] = quotes;

    return QuoteMapper.toDomain(quote);
  }

  public async getAllTranslatedByAuthor(
    authorName: string,
    options: QueryOptions,
  ): Promise<Quote[]> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.find({
      'translated.author': authorName,
      state: QuoteState.VERIFIED,
    })
      .setOptions(options)
      .lean();

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getRandomTranslatedByCategory(
    categoryName: string,
  ): Promise<Quote | null> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.aggregate([
      {
        $match: {
          'translated.categories': categoryName,
          state: QuoteState.VERIFIED,
        },
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
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.find({
      'translated.categories': categoryName,
      state: QuoteState.VERIFIED,
    })
      .setOptions(options)
      .lean();

    return quotes.map<Quote>(QuoteMapper.toDomain);
  }

  public async getTranslatedCountByCategory(
    categoryName: string,
  ): Promise<number> {
    const count = await MongooseQuoteModel.find({
      'translated.categories': categoryName,
      state: QuoteState.VERIFIED,
    })
      .countDocuments()
      .lean();

    return count;
  }

  public async getAllTranslated(options: QueryOptions): Promise<Quote[]> {
    const quotes: MongooseQuoteDoc[] = await MongooseQuoteModel.find({
      state: QuoteState.VERIFIED,
    })
      .setOptions(options)
      .lean();

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

  public async getById(id: string): Promise<Quote | null> {
    const quote: MongooseQuoteDoc = await MongooseQuoteModel.findById(
      id,
    ).lean();
    return QuoteMapper.toDomain(quote);
  }

  public async getCategories(): Promise<string[]> {
    const translatedAggregationResult = await MongooseQuoteModel.aggregate([
      { $match: { state: QuoteState.VERIFIED } },
      { $group: { _id: '$translated.categories' } },
    ]);

    let translatedCategories: string[] = translatedAggregationResult
      .map((aggregateResult) => aggregateResult._id)
      .flat();

    translatedCategories = Array.from(new Set(translatedCategories));

    return translatedCategories;
  }

  public async getAuthors(): Promise<string[]> {
    const translatedAggregationResult = await MongooseQuoteModel.aggregate([
      { $match: { state: QuoteState.VERIFIED } },
      { $group: { _id: '$translated.author' } },
    ]);

    const translatedAuthors: string[] = translatedAggregationResult
      .filter((aggregateResult) => aggregateResult._id != null)
      .map((aggregateResult) => aggregateResult._id);

    return translatedAuthors;
  }

  public async getTranslatedCountByAuthor(author: string): Promise<number> {
    const count = await MongooseQuoteModel.find({
      'translated.author': author,
      state: QuoteState.VERIFIED,
    })
      .countDocuments()
      .lean();

    return count;
  }

  public async updateById(
    quoteId: string,
    newQuote: Partial<Quote>,
  ): Promise<Quote | null> {
    const quote = await MongooseQuoteModel.findByIdAndUpdate(
      quoteId,
      newQuote,
      { new: true, useFindAndModify: false },
    );
    return QuoteMapper.toDomain(quote);
  }

  public async getRandomUntranslated(): Promise<Quote | null> {
    const [quote = null] = await MongooseQuoteModel.aggregate([
      {
        $match: {
          state: QuoteState.NOT_TRANSLATED,
        },
      },
      { $sample: { size: 1 } },
    ]);
    return QuoteMapper.toDomain(quote);
  }

  public async resetToUntranslatedById(docId: string): Promise<Quote | null> {
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
