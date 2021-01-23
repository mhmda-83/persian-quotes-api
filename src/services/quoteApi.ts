import axios, { AxiosInstance } from 'axios';

import { Quote } from '../model/quote';

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

  async getRandomQuote(): Promise<Quote> {
    const response = await this.http.get<QuotableQuote>('/random');

    const { author, content, tags } = response.data;

    const quote: Quote = {
      author,
      text: content,
      categories: tags,
    };

    return quote;
  }
}

export default QuoteApi;
