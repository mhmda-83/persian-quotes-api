import { ConstantConfiguration, ContainerConfiguration } from 'typescript-ioc';

import { Logger } from '../src/config';
import { ConsoleLogger } from '../src/infra/logger';
import { ContributorRepo } from '../src/repository/contributorRepo';
import { MongooseContributorRepo } from '../src/repository/mongooseContributorRepo';
import MongooseQuoteRepo from '../src/repository/mongooseQuote';
import QuoteRepo from '../src/repository/quote';

type ContainerConfig = (ConstantConfiguration | ContainerConfiguration)[];

const createConfig = () => ({
  databaseUrl: 'mongodb://localhost:27017/quote-test',
});

export function createContainer(): ContainerConfig {
  return [
    { bindName: 'config', to: createConfig() },
    { bind: Logger, to: ConsoleLogger },
    { bind: QuoteRepo, to: MongooseQuoteRepo },
    { bind: ContributorRepo, to: MongooseContributorRepo },
  ];
}
