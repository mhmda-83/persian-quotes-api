import { Middleware } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';

const translationVerification: Middleware<Context> = (ctx) => {
  ctx.logger.log(ctx.callbackQuery?.data);
};

export { translationVerification };
