import { Telegraf } from 'telegraf';

interface BotConfig {
  botToken: string;
}

function createTelegrafBot(botConfig: BotConfig) {
  const bot: Telegraf = new Telegraf(botConfig.botToken);

  bot.start((ctx) => ctx.reply('Welcome'));

  return bot;
}

export { createTelegrafBot };
