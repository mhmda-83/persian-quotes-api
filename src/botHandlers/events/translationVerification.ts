import { Middleware } from 'telegraf-ts';

import { TranslationState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';

const translationVerification: Middleware<Context> = async (ctx) => {
  const data = ctx.callbackQuery?.data;
  if (data == null) return null;

  const [state, docId] = data.split('-');

  if (state === TranslationState.VERIFIED) {
    const updatedDoc = await ctx.repo.updateById(docId, { verified: true });
    if (updatedDoc)
      return ctx.editMessageText(
        'با موفقیت ثبت شد 🎉\n\nاین پیام بعد از ۵ ثانیه پاک میشود',
      );
  }

  const removedDoc = await ctx.repo.removeById(docId);
  if (removedDoc)
    ctx.editMessageText(
      'با موفقیت پاک شد 🎉\n\nاین پیام بعد از ۵ ثانیه پاک میشود',
    );

  return setTimeout(() => {
    ctx.deleteMessage();
  }, 5000);
};

export { translationVerification };
