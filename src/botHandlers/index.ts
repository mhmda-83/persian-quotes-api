import { Composer } from 'telegraf-ts';

import { Context } from '../infra/bot/context';
import { commandComposer } from './commands';
import { eventComposer } from './events';

const handlersComposer = new Composer<Context>();

handlersComposer.use(commandComposer);
handlersComposer.use(eventComposer);

export { handlersComposer };
