import { Composer } from 'telegraf-ts';

import { Context } from '../infra/bot/context';
import { commandComposer } from './commands';

const handlersComposer = new Composer<Context>();

handlersComposer.use(commandComposer);

export { handlersComposer };
