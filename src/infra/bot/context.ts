import { TelegrafContext } from 'telegraf-ts';

import { BotState } from '../../data/botStates';
import { Quote } from '../../model/quote';
import QuoteRepo from '../../repository/quote';
import { QuoteApi } from '../../services/quoteApi';
import { Logger } from '../logger';

interface CustomSession {
  state: BotState;
  userTranslatedQuote: Partial<Quote>;
  currentQuoteId: string;
}
interface Context extends TelegrafContext {
  repo: QuoteRepo;
  logger: Logger;
  session: CustomSession | null;
  quoteService: QuoteApi;
  adminsIds: string[];
}

export { Context };
