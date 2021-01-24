import { Markup, Middleware } from 'telegraf-ts';

import { TranslationProgressState } from '../../data/botActions';
import { Context } from '../../infra/bot/context';
import { QuoteApiQuote } from '../../services/quoteApi';
import { QuoteMap } from '../../viewModel/quoteMap';

const translateHandler: Middleware<Context> = async (ctx) => {
  switch (ctx.session.state) {
    case TranslationProgressState.TEXT:
      ctx.session.translatedQuote.text = ctx.message?.text;
      ctx.session.state = TranslationProgressState.AUTHOR;
      ctx.reply('now send me the author in persian');
      break;
    case TranslationProgressState.AUTHOR:
      ctx.session.translatedQuote.author = ctx.message?.text;
      ctx.session.state = TranslationProgressState.CATEGORIES;
      ctx.reply(
        'now send me the categories in persian (each separated by space)',
      );
      break;
    case TranslationProgressState.CATEGORIES:
      {
        ctx.session.translatedQuote.categories = ctx.message?.text?.split(' ');
        ctx.session.state = TranslationProgressState.NONE;
        ctx.reply(
          'thanks a lot for your contribution ♥\nwe will notify you when it gets verified',
        );
        const { currentQuoteId } = ctx.session;
        const quote: QuoteApiQuote = await ctx.quoteService.getById(
          currentQuoteId,
        );

        ctx.adminsIds.forEach((id) => {
          ctx.telegram.sendMessage(
            id,
            `${QuoteMap.toView(quote)}\n` +
              `ترجمه شد به\n\n` +
              `${QuoteMap.toView(ctx.session.translatedQuote)}`,
            {
              reply_markup: Markup.inlineKeyboard([
                Markup.callbackButton('✅', 'verified'),
                Markup.callbackButton('❌', 'declined'),
              ]).resize(),
            },
          );
        });
      }
      break;

    default:
      ctx.reply("hmm...this wasn't implemented in my source code 🤔");
      ctx.reply(JSON.stringify(ctx.session.translatedQuote));
      break;
  }
};

export { translateHandler };
