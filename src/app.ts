import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { Inject } from 'typescript-ioc';

import { TelegrafBot } from './bot';
import { getConfig } from './config';
import { Logger } from './infra/logger';
import { Quote } from './model/quote';
import QuoteRepo from './repository/quoteRepo';
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

  public async init({ seedingData }: { seedingData?: Quote[] }) {
    this.repo.connect();
    if (seedingData) await this.repo.seed(seedingData);

    if (config.isProduction) {
      this.app.use(hpp());
      this.app.use(mongoSanitize());
      this.app.use(
        rateLimit({
          max: 5,
          handler: (_: express.Request, res: express.Response) => {
            res
              .status(429)
              .json({ message: 'Too many requests, please try again later.' });
          },
        }),
      );
    }

    this.app.use('/api/v1/quotes', quoteRouter);
    this.app.use('/api/v1/categories', categoryRouter);
    this.app.use('/api/v1/authors', authorRouter);

    process.on('unhandledRejection', () => this.logger.error);
  }

  public listen() {
    if (config.isProduction) this.app.use(this.bot.lunchUsingWebhook());
    else this.bot.launchUsingPooling();

    this.app.listen(config.port, () => {
      this.logger.info(`app listening on port ${config.port} 👂`);
    });
  }
}

export { ExpressApp };
