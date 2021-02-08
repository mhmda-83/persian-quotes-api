import { Middleware } from 'telegraf-ts';

import { TranslationState } from '../../data/botStates';
import { QuoteState } from '../../data/quote';
import { Context } from '../../infra/bot/context';

const translationVerification: Middleware<Context> = async (ctx) => {
  const data = ctx.callbackQuery?.data;
  if (data == null) return ctx.logger.log('callback query was null');

  const [state, docId] = data.split('-');

  if (state === TranslationState.VERIFIED) {
    const updatedDoc = await ctx.repo.updateById(docId, {
      state: QuoteState.VERIFIED,
    });
    if (updatedDoc)
      ctx.editMessageText(
        'با موفقیت ثبت شد 🎉\n\nاین پیام بعد از ۵ ثانیه پاک میشود',
      );
    else ctx.editMessageText('خطایی رخ داد');
  } else {
    const resetedDoc = await ctx.repo.resetToUntranslatedById(docId);
    if (resetedDoc)
      ctx.editMessageText(
        'با موفقیت پاک شد 🎉\n\nاین پیام بعد از ۵ ثانیه پاک میشود',
      );
    else ctx.editMessageText('خطایی رخ داد');
  }
  return setTimeout(() => {
    ctx.deleteMessage();
  }, 5000);
};

export { translationVerification };
