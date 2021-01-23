import express, { Express } from 'express';

import { createTelegrafBot } from './bot';
import { getConfig } from './config';
import { ConsoleLogger } from './infra/logger';
import authorRouter from './routers/author';
import categoryRouter from './routers/category';
import quoteRouter from './routers/quote';

const config = getConfig();
const logger = new ConsoleLogger();

const app: Express = express();

const bot = createTelegrafBot({
  logger,
  ...config,
});
if (config.isProduction) app.use(bot.webhookCallback(config.webhookPath));
else
  bot
    .launch()
    .then(() => logger.log('bot launch successfully  ✅'))
    .catch((err) => {
      logger.log('following error occurred ❌:');
      logger.error(err);
    });

app.use('/api/v1/quote', quoteRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/author', authorRouter);

export default app;
