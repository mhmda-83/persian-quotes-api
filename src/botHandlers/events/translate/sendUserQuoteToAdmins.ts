import { Markup } from 'telegraf-ts';

import { TranslationState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';
import { TranslatedQuote } from '../../../model/translatedQuote';
import { QuoteMap } from '../../../viewModel/quoteMap';

export const sendUserQuoteToAdmins = (
  ctx: Context,
  savedTranslatedQuote: TranslatedQuote,
): void => {
  ctx.session = null;
  const { id, translated, original } = savedTranslatedQuote;
  const translatedView = QuoteMap.translationView({
    original,
    translated,
  });

  const verifiedMarkupBtn = Markup.callbackButton(
    '✅',
    `${TranslationState.VERIFIED}-${id}`,
  );
  const declinedMarkupBtn = Markup.callbackButton(
    '❌',
    `${TranslationState.DECLINED}-${id}`,
  );

  return ctx.adminsIds.forEach((adminId) => {
    ctx.telegram.sendMessage(adminId, translatedView, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      reply_markup: Markup.inlineKeyboard([
        verifiedMarkupBtn,
        declinedMarkupBtn,
      ]).resize(),
    });
  });
};
