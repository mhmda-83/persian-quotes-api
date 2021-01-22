import { Middleware } from 'telegraf-ts';

import { Actions, Context } from '../../infra/bot/context';

const translateHandler: Middleware<Context> = async (ctx) => {
  ctx.session.action = Actions.TEXT;
  const randomQuote = await ctx.quoteService.getRandomQuote();
  ctx.reply(
    `${randomQuote.text}\n\n—${
      randomQuote.author
    }\n${randomQuote.categories.map((c) => `#${c}`).join(' ')}`,
  );
  ctx.reply('now send me the translated quote (just the text for now)');
};

export { translateHandler };
