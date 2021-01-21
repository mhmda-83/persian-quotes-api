import { Context, session, Telegraf } from 'telegraf';

import { handlersComposer } from '../botHandlers';

function createTelegrafBot(
  botToken: string,
  options: Partial<Telegraf.Options<Context>>,
) {
  const bot: Telegraf = new Telegraf(botToken, options);

  bot.use(session());
  bot.start((ctx) => ctx.reply('Welcome'));
  bot.use(handlersComposer);
  return bot;
}

export { createTelegrafBot };
