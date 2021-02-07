import { MongooseQuoteDoc } from '../model/mongooseQuoteModel';
import { Quote } from '../model/quote';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class QuoteMapper {
  public static toDomain(quote: null): null;
  public static toDomain(quote: MongooseQuoteDoc): Quote;
  public static toDomain(quote: MongooseQuoteDoc | null): Quote | null;
  public static toDomain(quote: MongooseQuoteDoc | null): Quote | null {
    if (quote == null) {
      return null;
    }

    return {
      id: quote._id,
      original: quote.original,
      translated: quote.translated,
      state: quote.state,
    };
  }
}

export { QuoteMapper };
