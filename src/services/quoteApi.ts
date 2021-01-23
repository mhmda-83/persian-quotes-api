import axios, { AxiosInstance } from 'axios';

import { QuoteViewModel } from '../model/quote';

interface QuotableQuote {
  author: string;
  content: string;
  tags: string[];
}

class QuoteApi {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: 'https://api.quotable.io' });
  }

  async getRandomQuote(): Promise<QuoteViewModel> {
    const response = await this.http.get<QuotableQuote>('/random');

    const { author, content, tags } = response.data;

    const quote: QuoteViewModel = {
      author,
      text: content,
      categories: tags,
      toMarkdown() {
        return `${quote.text}\n\n—${quote.author}\n${quote.categories
          .map((c) => `#${c}`)
          .join(' ')}`;
      },
    };

    return quote;
  }
}

export default QuoteApi;
