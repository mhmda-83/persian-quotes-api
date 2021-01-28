import express, { Express } from 'express';
import { Inject } from 'typescript-ioc';

import { TelegrafBot } from './bot';
import { getConfig } from './config';
import { Logger } from './infra/logger';
import { TranslatedQuote } from './model/translatedQuote';
import QuoteRepo from './repository/quote';
import authorRouter from './routers/author';
import categoryRouter from './routers/category';
import quoteRouter from './routers/quote';

const config = getConfig();

class ExpressApp {
  @Inject logger: Logger;
  @Inject repo: QuoteRepo;
  @Inject private bot: TelegrafBot;
  private app: Express;

  constructor() {
    this.app = express();
  }

  public async init({ seedingData }: { seedingData?: TranslatedQuote[] }) {
    this.repo.connect();
    if (seedingData) await this.repo.seed(seedingData);

    this.app.use('/api/v1/quote', quoteRouter);
    this.app.use('/api/v1/category', categoryRouter);
    this.app.use('/api/v1/author', authorRouter);
  }

  public listen() {
    if (config.isProduction) this.app.use(this.bot.lunchUsingWebhook());
    else this.bot.launchUsingPooling();

    this.app.listen(config.port, () => {
      this.logger.info(`Server Started on Port ${config.port}`);
    });
  }
}

export { ExpressApp };
