import { TranslationProgressState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';

export const gettingQuoteTextTranslation = (ctx: Context) => {
  if (!ctx.session) return null;

  ctx.session.userTranslatedQuote.text = ctx.message?.text;
  ctx.session.state = TranslationProgressState.AUTHOR;
  return ctx.reply('now send me the author in persian');
};
