import axios, { AxiosInstance } from 'axios';
import { Category } from '../categories/model';
import { Quote } from '../quotes/model';

class QuoteApi {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: 'https://api.quotable.io' });
  }

  async getRandom(): Promise<Quote> {
    const response = await this.http.get('/random');

    const { author, text, tags } = response.data;

    if (
      typeof author !== 'string'
      || typeof text !== 'string'
      || !Array.isArray(response.data.tags)
    ) {
      throw new Error('Failed to fetch quote.');
    }

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
