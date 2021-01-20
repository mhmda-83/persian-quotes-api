import { Telegraf } from 'telegraf';

interface BotConfig {
  botToken: string;
}

function createBot(botConfig: BotConfig) {
  const bot: Telegraf = new Telegraf(botConfig.botToken);

  bot.start((ctx) => ctx.reply('Welcome'));

  return bot;
}

export { createBot };
