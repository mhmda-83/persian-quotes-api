import { session, Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';

import { handlersComposer } from './botHandlers';
import { Logger } from './config';
import { Actions, Context } from './infra/bot/context';
import QuoteApi from './services/quoteApi';

function createTelegrafBot(
  botToken: string,
  logger: Logger,
  options?: TelegrafOptions,
) {
  const bot: Telegraf<Context> = new Telegraf<Context>(botToken, options);

  bot.context.logger = logger;
  bot.context.quoteService = new QuoteApi();

  bot.use(session());

  bot.start((ctx: Context) => {
    ctx.session.action = Actions.NONE;
  });
  bot.use(handlersComposer);
  return bot;
}

export { createTelegrafBot };
