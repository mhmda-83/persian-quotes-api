import { Middleware } from 'telegraf-ts';

import { TranslationState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';

const translationVerification: Middleware<Context> = async (ctx) => {
  const data = ctx.callbackQuery?.data;
  if (data != null) {
    const [state, docId] = data.split('-');
    if (state === TranslationState.VERIFIED) {
      await ctx.repo.updateVerificationById(docId, true);
      ctx.editMessageText(
        'saved successfully 🎉\n\n this message will be deleted in 5 seconds',
      );
    } else if (state === TranslationState.DECLINED) {
      const isRemoved = await ctx.repo.removeById(docId);
      if (isRemoved)
        ctx.editMessageText(
          'removed from the database successfully 🎉\n\nthis message will be deleted in 5 seconds',
        );
      else ctx.reply('it seems something went wrong while trying to delete 🤔');
    }
    setTimeout(() => {
      ctx.deleteMessage();
    }, 5000);
  }
};

export { translationVerification };
