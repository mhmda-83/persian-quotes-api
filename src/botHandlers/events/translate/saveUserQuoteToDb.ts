import { QuoteState } from '../../../data/quote';
import { Context } from '../../../infra/bot/context';
import { Quote } from '../../../model/quote';
import { TranslatedQuote } from '../../../model/translatedQuote';

export const saveUserQuoteToDb = async (
  ctx: Context,
): Promise<TranslatedQuote | null> => {
  if (!ctx.session) return null;

  const { currentQuoteId, userTranslatedQuote } = ctx.session;
  ctx.logger.log(currentQuoteId, userTranslatedQuote);

  const quote = await ctx.repo.getById(currentQuoteId);
  if (!quote) {
    return null;
  }
  ctx.logger.log('quote is here');

  const translatedQuote: TranslatedQuote = {
    original: quote?.original,
    translated: userTranslatedQuote as Quote,
    verified: QuoteState.NOT_VERIFIED,
  };
  const savedTranslatedQuote = await ctx.repo.updateById(
    currentQuoteId,
    translatedQuote,
  );

  ctx.logger.log(savedTranslatedQuote);
  return savedTranslatedQuote;
};
