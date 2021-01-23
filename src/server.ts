import mongoose from 'mongoose';

import app from './app';
import { getConfig } from './config';
import { ConsoleLogger } from './infra/logger';

const config = getConfig();

const logger = new ConsoleLogger();

mongoose
  .connect(config.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Database Connected :)');
    app.listen(config.port, () => {
      logger.info(`Server Started on Port ${config.port}`);
    });
  })
  .catch(logger.error);
