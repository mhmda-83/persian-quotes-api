import { Quote } from '../model/quote';

const quotes: Quote[] = [
  {
    text: 'زمان یک توهم است.',
    author: { name: 'آلبرت اینشتین' },
    categories: [{ name: 'science' }],
  },
  {
    text:
      'منطق شما را از نقطه‌ی الف به نقطه‌ی ب می‌رساند. تخیل شما را به هرجایی می‌برد.',
    author: { name: 'آلبرت اینشتین' },
    categories: [{ name: 'life' }],
  },
  {
    text: 'هر احمقی می‌تواند بداند. نکته در فهمیدن است.',
    author: { name: 'آلبرت اینشتین' },
    categories: [{ name: 'science' }],
  },
  {
    text: 'کسی که اشتباه نکرده باشد تا به حال چیز جدیدی را امتحان نکرده است.',
    author: { name: 'آلبرت اینشتین' },
    categories: [{ name: 'life' }],
  },
  {
    text:
      'دو چیز بی نهایت است. جهان و احمقیت انسان. و من هنوز راجع به بی نهایت بودن جهان مطمئن نیستم.',
    author: { name: 'آلبرت اینشتین' },
    categories: [{ name: 'life' }],
  },
];

export default quotes;
