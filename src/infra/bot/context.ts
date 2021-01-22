import { TelegrafContext } from 'telegraf-ts';

import { Logger } from '../logger';

interface Context extends TelegrafContext {
  logger: Logger;
}

export { Context };
