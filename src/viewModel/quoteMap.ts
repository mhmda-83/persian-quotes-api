import { OriginalQuote, TranslatedQuote } from '../model/quote';

const QuoteMap = {
  toView({
    text = 'خالی',
    author = 'خالی',
    categories = ['خالی'],
  }: Partial<OriginalQuote> = {}) {
    const mappedCats = categories.map((c) => `#${c}`).join(' ');
    return `${text}\n\n—${author}\n${mappedCats}`;
  },

  translationView({
    original,
    translated,
  }: {
    original: Partial<OriginalQuote>;
    translated: TranslatedQuote;
  }) {
    return (
      `${QuoteMap.toView(original)}\n` +
      `ترجمه شد به\n\n` +
      `${QuoteMap.toView(translated)}`
    );
  },
};

export { QuoteMap };
