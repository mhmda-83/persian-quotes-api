import RedisSession from 'telegraf-session-redis';
import { Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';

import { handlersComposer } from './botHandlers';
import { Logger, RedisUrlParts } from './config';
import { DefaultState } from './data/botStates';
import { Context } from './infra/bot/context';
import { QuoteApi } from './services/quoteApi';

interface BotConfig {
  botToken: string;
  adminsIds: string[];
  redisUrl: RedisUrlParts;
  logger: Logger;
}

function createTelegrafBot(
  { botToken, logger, redisUrl, adminsIds }: BotConfig,
  options?: TelegrafOptions,
) {
  const bot: Telegraf<Context> = new Telegraf<Context>(botToken, options);

  bot.context.logger = logger;
  bot.context.quoteService = new QuoteApi();
  bot.context.adminsIds = adminsIds;
  const redisSession = new RedisSession({
    store: redisUrl,
  });
  bot.use(redisSession);

  bot.start((ctx: Context) => {
    ctx.session.state = DefaultState.NONE;
  });
  bot.use(handlersComposer);
  return bot;
}

export { createTelegrafBot };
