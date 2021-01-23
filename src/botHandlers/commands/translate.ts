import { Middleware } from 'telegraf-ts';

import { Actions, Context } from '../../infra/bot/context';
import { QuoteViewModel } from '../../model/quote';

const translateHandler: Middleware<Context> = async (ctx) => {
  ctx.session.action = Actions.TEXT;
  ctx.session.translatedQuote = {};
  const randomQuote: QuoteViewModel = await ctx.quoteService.getRandomQuote();
  await ctx.reply(randomQuote.toMarkdown());
  ctx.reply(
    'now send me the translated quote (just the text for now)\n\n' +
      "and if you're not fine with this quote send /translate again",
  );
};

export { translateHandler };
