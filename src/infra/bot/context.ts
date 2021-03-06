/* eslint-disable @typescript-eslint/ban-types */
import { TelegrafContext } from 'telegraf-ts';
import { Inject, InjectValue } from 'typescript-ioc';

import { BotState } from '../../data/botStates';
import { TranslatedQuote } from '../../model/quote';
import { ContributorRepo } from '../../repository/contributorRepo';
import QuoteRepo from '../../repository/quoteRepo';
import { Logger } from '../logger';

interface TelegrafSession {
  state: BotState;
  userTranslatedQuote: TranslatedQuote;
  currentQuoteId: string;
}
interface Context extends TelegrafContext {
  quoteRepo: QuoteRepo;
  contributorRepo: ContributorRepo;
  logger: Logger;
  session: TelegrafSession | null;
  adminChannelId: number;
  destroySession: () => void;
}

abstract class CustomContextProps {
  public quoteRepo: QuoteRepo;
  public contributorRepo: ContributorRepo;
  public logger: Logger;
  public session: TelegrafSession | null;
  public adminChannelId: number;
  public destroySession: () => void;
}

class CustomContextPropsImp implements CustomContextProps {
  @Inject public logger: Logger;
  @Inject public quoteRepo: QuoteRepo;
  @Inject public contributorRepo: ContributorRepo;

  @InjectValue('config.adminChannelId') public adminChannelId: number;

  public session: TelegrafSession | null;
  public destroySession(): void {
    this.session = null;
  }
}
export { Context, CustomContextProps, CustomContextPropsImp, TelegrafSession };
