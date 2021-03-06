import { ConstantConfiguration, ContainerConfiguration } from 'typescript-ioc';

import { TelegrafBot } from '../bot';
import {
  CustomContextProps,
  CustomContextPropsImp,
} from '../infra/bot/context';
import { ConsoleLogger } from '../infra/logger';
import { ContributorRepo } from '../repository/contributorRepo';
import { MongooseContributorRepo } from '../repository/mongooseContributorRepo';
import MongooseQuoteRepo from '../repository/mongooseQuoteRepo';
import QuoteRepo from '../repository/quoteRepo';
import { QuoteApi } from '../services/quoteApi';
import { getConfig, Logger } from '.';

type ContainerConfig = (ConstantConfiguration | ContainerConfiguration)[];

export function createContainer(): ContainerConfig {
  return [
    { bindName: 'config', to: getConfig() },
    { bind: Logger, to: ConsoleLogger },
    { bind: QuoteRepo, to: MongooseQuoteRepo },
    { bind: ContributorRepo, to: MongooseContributorRepo },
    { bind: QuoteApi, to: QuoteApi },
    { bind: CustomContextProps, to: CustomContextPropsImp },
    { bind: TelegrafBot, to: TelegrafBot },
  ];
}
