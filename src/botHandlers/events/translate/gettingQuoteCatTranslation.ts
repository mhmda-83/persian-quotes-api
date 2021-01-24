import { DefaultState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';

export const gettingQuoteCatTranslation = (ctx: Context) => {
  if (!ctx.session) return null;

  const { userTranslatedQuote } = ctx.session;

  userTranslatedQuote.categories = ctx.message?.text?.split(' ');
  ctx.session.state = DefaultState.NONE;

  return ctx.reply(
    'thanks a lot for your contribution ♥\nwe will notify you when it gets verified',
  );
};
