import { TelegrafContext } from 'telegraf-ts';

import { BotState } from '../../data/botStates';
import { Quote } from '../../model/quote';
import { QuoteApi } from '../../services/quoteApi';
import { Logger } from '../logger';

interface CustomSession {
  state: BotState;
  translatedQuote: Partial<Quote>;
  currentQuoteId: string;
}
interface Context extends TelegrafContext {
  logger: Logger;
  session: CustomSession;
  quoteService: QuoteApi;
  adminsIds: string[];
}

export { Context };
