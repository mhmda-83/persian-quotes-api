import { Middleware } from 'telegraf-ts';

import { TranslationProgressState } from '../../../data/botStates';
import { Context } from '../../../infra/bot/context';
import { gettingQuoteAuthorTranslation } from './gettingQuoteAuthorTranslation';
import { gettingQuoteCatTranslation } from './gettingQuoteCatTranslation';
import { gettingQuoteTextTranslation } from './gettingQuoteTextTranslation';
import { saveUserQuoteToDb } from './saveUserQuoteToDb';
import { sendUserQuoteToAdmins } from './sendUserQuoteToAdmins';

const translateHandler: Middleware<Context> = async (ctx) => {
  switch (ctx.session?.state) {
    case TranslationProgressState.TEXT:
      gettingQuoteTextTranslation(ctx);
      break;
    case TranslationProgressState.AUTHOR:
      gettingQuoteAuthorTranslation(ctx);
      break;
    case TranslationProgressState.CATEGORIES: {
      gettingQuoteCatTranslation(ctx);
      const savedQuote = await saveUserQuoteToDb(ctx);
      if (savedQuote) sendUserQuoteToAdmins(ctx, savedQuote);
      break;
    }
    default:
      ctx.reply("hmm...this wasn't implemented in my source code 🤔");
      break;
  }
};

export { translateHandler };
