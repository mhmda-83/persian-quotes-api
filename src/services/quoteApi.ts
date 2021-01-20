import axios, { AxiosInstance } from 'axios';

import { Category } from '../model/category';
import { Quote } from '../model/quote';

interface QuotableQuote {
  author: string;
  text: string;
  tags: [string];
}

class QuoteApi {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: 'https://api.quotable.io' });
  }

  async getRandomQuote(): Promise<Quote> {
    const response = await this.http.get<QuotableQuote>('/random');

    const { author, text, tags } = response.data;

    const categories: Category[] = tags.map((tag: string) => ({ name: tag }));

    const quote: Quote = {
      author: { name: author },
      text,
      categories,
    };

    return quote;
  }
}

export default QuoteApi;
