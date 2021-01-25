import { TranslationProgressState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';

export const gettingQuoteTextTranslation = (ctx: Context) => {
  if (!ctx.session) return null;

  ctx.session.userTranslatedQuote.text = ctx.message?.text;
  ctx.session.state = TranslationProgressState.AUTHOR;
  return ctx.reply('حالا اسم نویسنده رو به فارسی برام بفرست');
};
