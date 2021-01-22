import express, { Express } from 'express';

import { createTelegrafBot } from './bot';
import { getConfig } from './config';
import { ConsoleLogger } from './infra/logger';

const config = getConfig();
const logger = new ConsoleLogger();

const app: Express = express();

const bot = createTelegrafBot(config.botToken, logger);
if (config.isProduction) app.use(bot.webhookCallback(config.webhookPath));
else
  bot
    .launch()
    .then(() => logger.log('bot launch successfully  ✅'))
    .catch((err) => {
      logger.log('following error occurred ❌:');
      logger.error(err);
    });
