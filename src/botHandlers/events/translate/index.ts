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
      return gettingQuoteTextTranslation(ctx);

    case TranslationProgressState.AUTHOR:
      return gettingQuoteAuthorTranslation(ctx);

    case TranslationProgressState.CATEGORIES: {
      gettingQuoteCatTranslation(ctx);
      const savedQuote = await saveUserQuoteToDb(ctx);
      if (savedQuote == null) {
        return ctx.logger.log('savedQuote or session was null');
      }
      return sendUserQuoteToAdmins(ctx, savedQuote);
    }

    default:
      return ctx.reply("hmm...this wasn't implemented in my source code 🤔");
  }
};

export { translateHandler };
