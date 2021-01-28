import express, { Express, RequestHandler } from 'express';
import { Inject } from 'typescript-ioc';

import { getConfig } from './config';
import { Logger } from './infra/logger';
import authorRouter from './routers/author';
import categoryRouter from './routers/category';
import quoteRouter from './routers/quote';

const config = getConfig();

class ExpressApp {
  @Inject logger: Logger;
  private app: Express;

  constructor() {
    this.app = express();

    this.useRouteHandler('/api/v1/quote', quoteRouter);
    this.useRouteHandler('/api/v1/category', categoryRouter);
    this.useRouteHandler('/api/v1/author', authorRouter);
  }

  public listen() {
    this.app.listen(config.port, () => {
      this.logger.info(`Server Started on Port ${config.port}`);
    });
  }

  useRouteHandler(route: string, middleware: RequestHandler) {
    this.app.use(route, middleware);
  }

  useMiddleware(middleware: RequestHandler) {
    this.app.use(middleware);
  }
}

export { ExpressApp };
