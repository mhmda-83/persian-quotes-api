import { ConstantConfiguration, ContainerConfiguration } from 'typescript-ioc';

import { TelegrafBot } from '../bot';
import {
  CustomContextProps,
  CustomContextPropsImp,
} from '../infra/bot/context';
import { ConsoleLogger } from '../infra/logger';
import MongooseQuoteRepo from '../repository/mongooseQuote';
import QuoteRepo from '../repository/quote';
import { QuoteApi } from '../services/quoteApi';
import { getConfig, Logger } from '.';

type ContainerConfig = (ConstantConfiguration | ContainerConfiguration)[];

export function createContainer(): ContainerConfig {
  return [
    { bindName: 'config', to: getConfig() },
    { bind: Logger, to: ConsoleLogger },
    { bind: QuoteRepo, to: MongooseQuoteRepo },
    { bind: QuoteApi, to: QuoteApi },
    { bind: CustomContextProps, to: CustomContextPropsImp },
    { bind: TelegrafBot, to: TelegrafBot },
  ];
}
