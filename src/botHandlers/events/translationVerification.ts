import { Middleware } from 'telegraf-ts';

import { DefaultState, TranslationState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';

const translationVerification: Middleware<Context> = (ctx) => {
  switch (ctx.callbackQuery?.data) {
    case TranslationState.VERIFIED: {
      break;
    }
    case TranslationState.DECLINED: {
      break;
    }
    default: {
      ctx.session.state = DefaultState.NONE;
    }
  }
};

export { translationVerification };
