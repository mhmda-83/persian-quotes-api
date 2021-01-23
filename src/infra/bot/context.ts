import { TelegrafContext } from 'telegraf-ts';

import { Actions } from '../../data/botActions';
import { Quote } from '../../model/quote';
import QuoteApi from '../../services/quoteApi';
import { Logger } from '../logger';

interface CustomSession {
  action: Actions;
  translatedQuote: Partial<Quote>;
}
interface Context extends TelegrafContext {
  logger: Logger;
  session: CustomSession;
  quoteService: QuoteApi;
}

export { Actions, Context };
