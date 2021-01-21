import { session, Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';

import { handlersComposer } from '../botHandlers';
import { Context } from '../infra/bot/context';

function createTelegrafBot(botToken: string, options?: TelegrafOptions) {
  const bot: Telegraf<Context> = new Telegraf<Context>(botToken, options);

  bot.use(session());
  bot.start((ctx: Context) => ctx.reply('Welcome'));
  bot.use(handlersComposer);
  return bot;
}

export { createTelegrafBot };
