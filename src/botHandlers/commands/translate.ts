import { Middleware } from 'telegraf-ts';

import { Actions, Context } from '../../infra/bot/context';

const translateHandler: Middleware<Context> = (ctx) => {
  ctx.session.action = Actions.TEXT;
};

export { translateHandler };
