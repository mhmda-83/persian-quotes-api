import { Middleware } from 'telegraf-ts';

import { TranslationProgressState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';
import { QuoteApiQuote } from '../../services/quoteApi';
import { QuoteMap } from '../../viewModel/quoteMap';

const translateHandler: Middleware<Context> = async (ctx) => {
  const randomQuote: QuoteApiQuote = await ctx.quoteService.getRandomQuote();

  ctx.session.currentQuoteId = randomQuote.id;
  ctx.session.state = TranslationProgressState.TEXT;
  ctx.session.translatedQuote = {};

  await ctx.reply(QuoteMap.toView(randomQuote));
  ctx.reply(
    'now send me the translated quote (just the text for now)\n\n' +
      "and if you're not fine with this quote send /translate again",
  );
};

export { translateHandler };
