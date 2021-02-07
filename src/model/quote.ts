import { QuoteState } from '../data/quote';

export interface UntranslatedQuote {
  text: string;
  categories: string[];
  author: string;
}

export interface TranslatedQuote {
  text?: string;
  categories?: string[];
  author?: string;
}

export interface Quote {
  id?: string;
  original: UntranslatedQuote;
  translated: TranslatedQuote;
  state: QuoteState;
}
