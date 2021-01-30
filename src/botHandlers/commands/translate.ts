import { Middleware } from 'telegraf-ts';

import { TranslationProgressState } from '../../data/botStates';
import { QuoteState } from '../../data/quote';
import { Context } from '../../infra/bot/context';
import { QuoteMap } from '../../viewModel/quoteMap';

const translateHandler: Middleware<Context> = async (ctx) => {
  const randomQuote = await ctx.repo.getRandomByField({
    state: QuoteState.NOT_TRANSLATED,
  });
  if (ctx.session && randomQuote) {
    ctx.session.currentQuoteId = randomQuote.id as string;
    ctx.session.state = TranslationProgressState.TEXT;
    ctx.session.userTranslatedQuote = {};
    await ctx.reply(QuoteMap.toView(randomQuote.original));
    ctx.reply(
      'این نقل قول به انگلیسی بود حالا متن اش رو به فارسی برام بفرست (فعلا فقط متنش)\n\n' +
        'اگر از ین نقل قول خوشت نمیاد یک بار دیگه /translate رو برام بفرست.',
    );
  }
};

export { translateHandler };
