import RedisSession from 'telegraf-session-redis';
import { Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';

import { handlersComposer } from './botHandlers';
import { Logger, RedisUrlParts } from './config';
import { DefaultState } from './data/botStates';
import { Context } from './infra/bot/context';
import QuoteRepo from './repository/quote';
import { QuoteApi } from './services/quoteApi';

interface BotConfig {
  botToken: string;
  adminChannelId: number;
  redisUrl: RedisUrlParts;
  logger: Logger;
  repo: QuoteRepo;
}

function createTelegrafBot(
  { botToken, logger, redisUrl, adminChannelId, repo }: BotConfig,
  options?: TelegrafOptions,
) {
  const bot: Telegraf<Context> = new Telegraf<Context>(botToken, options);

  bot.context.repo = repo;
  bot.context.logger = logger;
  bot.context.quoteService = new QuoteApi();
  bot.context.adminChannelId = adminChannelId;

  const redisSession = new RedisSession({
    store: redisUrl,
  });
  bot.use(redisSession.middleware());

  bot.start((ctx: Context) => {
    if (ctx.session) ctx.session.state = DefaultState.NONE;
  });
  bot.use(handlersComposer);
  return bot;
}

export { createTelegrafBot };
