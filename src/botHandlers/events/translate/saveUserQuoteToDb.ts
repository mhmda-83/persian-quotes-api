import { QuoteState } from '../../../data/quote';
import { Context } from '../../../infra/bot/context';
import { Quote, TranslatedQuote } from '../../../model/quote';

export const saveUserQuoteToDb = async (
  ctx: Context,
): Promise<Quote | null> => {
  if (!ctx.session) return null;

  const { currentQuoteId, userTranslatedQuote } = ctx.session;

  const quote = await ctx.repo.getById(currentQuoteId);
  if (!quote) {
    return null;
  }

  const translatedQuote: Quote = {
    original: quote?.original,
    translated: userTranslatedQuote as TranslatedQuote,
    state: QuoteState.NOT_VERIFIED,
  };
  const savedTranslatedQuote = await ctx.repo.updateById(
    currentQuoteId,
    translatedQuote,
  );

  return savedTranslatedQuote;
};
