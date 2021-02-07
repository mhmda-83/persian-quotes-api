import { QuoteState } from '../data/quote';

export interface OriginalQuote {
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
  original: OriginalQuote;
  translated: TranslatedQuote;
  state: QuoteState;
}
