import { Context } from '../../../infra/bot/context';
import { Quote } from '../../../model/quote';
import { TranslatedQuote } from '../../../model/translatedQuote';

export const saveUserQuoteToDb = async (
  ctx: Context,
): Promise<TranslatedQuote | null> => {
  if (!ctx.session) return null;

  const { currentQuoteId, userTranslatedQuote } = ctx.session;
  const originalQuote = await ctx.quoteService.getById(currentQuoteId);

  const translatedQuote: TranslatedQuote = {
    original: originalQuote,
    translated: userTranslatedQuote as Quote,
    verified: false,
  };
  const savedTranslatedQuote = await ctx.repo.insertOne(translatedQuote);
  return savedTranslatedQuote;
};
