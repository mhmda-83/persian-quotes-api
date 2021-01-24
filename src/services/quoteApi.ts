/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosInstance } from 'axios';

import { Quote } from '../model/quote';

interface QuotableQuote {
  author: string;
  content: string;
  tags: string[];
  _id: string;
}

interface QuoteApiQuote extends Quote {
  id: string;
}

class QuoteApi {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: 'https://api.quotable.io' });
  }

  public async getRandomQuote(): Promise<QuoteApiQuote> {
    const response = await this.http.get<QuotableQuote>('/random');

    const { author, content, tags, _id } = response.data;
    const quote: QuoteApiQuote = {
      author,
      text: content,
      categories: tags,
      id: _id,
    };

    return quote;
  }

  public async getById(id: string): Promise<QuoteApiQuote> {
    const response = await this.http.get<QuotableQuote>(`/quotes/${id}`);
    const { author, content, tags, _id } = response.data;
    const quote: QuoteApiQuote = {
      author,
      text: content,
      categories: tags,
      id: _id,
    };
    return quote;
  }
}

export { QuoteApi, QuoteApiQuote };
