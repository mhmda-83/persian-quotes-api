import { TelegrafContext } from 'telegraf-ts';

import { Actions } from '../../data/botActions';
import { Logger } from '../logger';

interface CustomSession {
  action: Actions;
}
interface Context extends TelegrafContext {
  logger: Logger;
  session: CustomSession;
}

export { Actions, Context };
