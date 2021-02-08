import { Middleware } from 'telegraf-ts';

import { TranslationProgressState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';
import { QuoteMapper } from '../../mapper/quoteMapper';

const translateHandler: Middleware<Context> = async (ctx) => {
  const randomQuote = await ctx.repo.getRandomUntranslated();
  if (ctx.session && randomQuote) {
    ctx.session.currentQuoteId = randomQuote.id as string;
    ctx.session.state = TranslationProgressState.TEXT;
    ctx.session.userTranslatedQuote = {};
    await ctx.reply(QuoteMapper.toView(randomQuote.original));
    return ctx.reply(
      'این نقل قول به انگلیسی بود حالا متن اش رو به فارسی برام بفرست (فعلا فقط متنش)\n\n' +
        'اگر از ین نقل قول خوشت نمیاد یک بار دیگه /translate رو برام بفرست.',
    );
  }
  return ctx.logger.log('no random quote was present or session was null');
};

export { translateHandler };
