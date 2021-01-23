import { TelegrafContext } from 'telegraf-ts';

import { TranslationActions } from '../../data/botActions';
import { Quote } from '../../model/quote';
import { QuoteApi } from '../../services/quoteApi';
import { Logger } from '../logger';

interface CustomSession {
  action: TranslationActions;
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
