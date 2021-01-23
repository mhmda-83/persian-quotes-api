export interface Quote {
  text: string;
  categories: string[];
  author: string;
}

export interface QuoteViewModel extends Quote {
  toMarkdown: () => string;
}
