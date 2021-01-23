import { Middleware } from 'telegraf-ts';

import { Actions, Context } from '../../infra/bot/context';

const translateHandler: Middleware<Context> = (ctx) => {
  ctx.logger.log(ctx.chat?.id);

  switch (ctx.session.action) {
    case Actions.TEXT:
      ctx.session.translatedQuote.text = ctx.message?.text;
      ctx.session.action = Actions.AUTHOR;
      ctx.reply('now send me the author in persian');
      break;
    case Actions.AUTHOR:
      ctx.session.translatedQuote.author = ctx.message?.text;
      ctx.session.action = Actions.CATEGORIES;
      ctx.reply(
        'now send me the categories in persian (each separated by space)',
      );
      break;
    case Actions.CATEGORIES:
      ctx.session.translatedQuote.categories = ctx.message?.text?.split(' ');
      ctx.session.action = Actions.NONE;
      ctx.reply(
        'thanks a lot for your contribution ♥\nwe will notify you when it gets verified',
      );
      break;

    default:
      ctx.reply("hmm...this wasn't implemented in my source code 🤔");
      ctx.reply(JSON.stringify(ctx.session.translatedQuote));
      break;
  }
};

export { translateHandler };
