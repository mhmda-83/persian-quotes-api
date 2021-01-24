import { Quote } from './quote';

export interface TranslatedQuote {
  id?: string;
  original: Quote;
  translated: Quote;
  verified: boolean;
}
