import { QuoteState } from '../data/quote';
import { Quote } from './quote';

export interface TranslatedQuote {
  id?: string;
  original: Quote;
  translated: Partial<Quote>;
  verified: QuoteState;
}
