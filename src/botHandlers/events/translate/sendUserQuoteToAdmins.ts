import { Markup } from 'telegraf-ts';

import { TranslationState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';
import { QuoteMapper } from '../../../mapper/quoteMapper';
import { Quote } from '../../../model/quote';

export const sendUserQuoteToAdmins = (
  ctx: Context,
  savedTranslatedQuote: Quote,
): void => {
  ctx.destroySession();

  const { id, translated, original } = savedTranslatedQuote;
  const translatedView = QuoteMapper.translationView({
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
  ctx.telegram.sendMessage(ctx.adminChannelId, translatedView, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    reply_markup: Markup.inlineKeyboard([
      verifiedMarkupBtn,
      declinedMarkupBtn,
    ]).resize(),
  });
};
