import { MongooseQuoteDoc } from '../model/mongooseQuoteModel';
import { Quote, TranslatedQuote, UntranslatedQuote } from '../model/quote';

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

  public static toView({
    text = 'خالی',
    author = 'خالی',
    categories = ['خالی'],
  }: Partial<UntranslatedQuote> = {}) {
    const mappedCats = categories.map((c) => `#${c}`).join(' ');
    return `${text}\n\n—${author}\n${mappedCats}`;
  }

  public static translationView({
    original,
    translated,
  }: {
    original: UntranslatedQuote;
    translated: TranslatedQuote;
  }) {
    return (
      `${QuoteMapper.toView(original)}\n` +
      `ترجمه شد به\n\n` +
      `${QuoteMapper.toView(translated)}`
    );
  }
}

export { QuoteMapper };
