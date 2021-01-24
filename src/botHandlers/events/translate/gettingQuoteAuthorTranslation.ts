import { TranslationProgressState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';

export const gettingQuoteAuthorTranslation = (ctx: Context) => {
  if (!ctx.session) return null;

  ctx.session.userTranslatedQuote.author = ctx.message?.text;
  ctx.session.state = TranslationProgressState.CATEGORIES;
  return ctx.reply(
    'now send me the categories in persian (each separated by space)',
  );
};
