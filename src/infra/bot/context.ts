/* eslint-disable @typescript-eslint/ban-types */
import { TelegrafContext } from 'telegraf-ts';
import { Inject, InjectValue } from 'typescript-ioc';

import { BotState } from '../../data/botStates';
import { TranslatedQuote } from '../../model/quote';
import QuoteRepo from '../../repository/quote';
import { Logger } from '../logger';

interface TelegrafSession {
  state: BotState;
  userTranslatedQuote: TranslatedQuote;
  currentQuoteId: string;
}
interface Context extends TelegrafContext {
  repo: QuoteRepo;
  logger: Logger;
  session: TelegrafSession | null;
  adminChannelId: number;
}

abstract class CustomContextProps {
  public logger: Logger;
  public repo: QuoteRepo;
  public session: TelegrafSession;
  public adminChannelId: number;
}

class CustomContextPropsImp implements CustomContextProps {
  @Inject public logger: Logger;
  @Inject public repo: QuoteRepo;
  @Inject public session: TelegrafSession;
  @InjectValue('config.adminChannelId') public adminChannelId: number;
}
export { Context, CustomContextProps, CustomContextPropsImp, TelegrafSession };
