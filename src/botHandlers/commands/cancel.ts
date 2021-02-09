import { Middleware } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';

const cancelHandler: Middleware<Context> = (ctx) => {
  ctx.destroySession();
};

export { cancelHandler };
