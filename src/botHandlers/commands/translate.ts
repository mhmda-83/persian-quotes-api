import { Middleware } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';

const translateHandler: Middleware<Context> = (ctx) => {
  ctx.logger.log('logged');
};

export { translateHandler };
