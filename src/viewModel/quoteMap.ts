import { Quote } from '../model/quote';

const QuoteMap = {
  toView({
    text = 'خالی',
    author = 'خالی',
    categories = ['خالی'],
  }: Partial<Quote>) {
    const mappedCats = categories.map((c) => `#${c}`).join(' ');
    return `${text}\n\n—${author}\n${mappedCats}`;
  },
};

export { QuoteMap };
