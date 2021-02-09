import { TranslationProgressState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';

export const gettingQuoteAuthorTranslation = (ctx: Context) => {
  if (!ctx.session) return ctx.logger.log('session was null');

  ctx.session.userTranslatedQuote.author = ctx.message?.text;
  ctx.session.state = TranslationProgressState.CATEGORIES;
  return ctx.reply(
    'حالا اسم دسته بندی های این نقل قول رو برام بفرست (هر دسته بندی رو با فاصله جدا کن)\n' +
      'اگر یک یا چند دسته بندی بیشتر از یک کلمه هستند با - جداشون کن مثلا اگر بود:\n\n' +
      'good-quote friendship\n' +
      'شما بنویسید:\n' +
      'نقل-قول-خوب دوستی\n\n' +
      'توجه: اگر تعداد دسته بندی ها بیشتر از ۲۰ تا هست لطفا حداقل ۱۰ تای آن را ترجمه کنید بیشتر هم که شد\n' +
      'بیشتر هم شد دیگه چه بهتر :)\n' +
      'و سعی کنید ریشه ای ترجمه کنید مثلا اگر دسته بندی ها شامل\n' +
      'dance dancer dancing\n' +
      'بود شما کافیه بنویسید "رقص"',
  );
};
