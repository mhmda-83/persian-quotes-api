import { Middleware } from 'telegraf-ts';

import { TranslationState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';
import { Quote } from '../../model/quote';
import { TranslatedQuote } from '../../model/translatedQuote';
import { QuoteApiQuote } from '../../services/quoteApi';

const translationVerification: Middleware<Context> = async (ctx) => {
  if (ctx.callbackQuery?.data === TranslationState.VERIFIED) {
    const currentQuoteId = ctx.session?.currentQuoteId;
    const originalQuote: QuoteApiQuote = await ctx.quoteService.getById(
      currentQuoteId as string,
    );
    const userTranslatedQuote = ctx.session?.translatedQuote as Quote;
    const quote: TranslatedQuote = {
      original: originalQuote,
      translated: userTranslatedQuote,
    };
    ctx.repo.insertOne(quote);
  }
  ctx.session = null;
};

export { translationVerification };
