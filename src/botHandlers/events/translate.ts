import { Middleware } from 'telegraf-ts';

import { Actions, Context } from '../../infra/bot/context';

const translateHandler: Middleware<Context> = (ctx) => {
  switch (ctx.session.action) {
    case Actions.TEXT:
      break;
    case Actions.AUTHOR:
      break;
    case Actions.CATEGORIES:
      break;
    case Actions.NONE:
      break;

    default:
      ctx.reply("hmm...this wasn't implemented in my source code 🤔");
      break;
  }
};

export { translateHandler };
