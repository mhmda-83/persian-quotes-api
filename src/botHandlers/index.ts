import { Composer } from 'telegraf';

import { commandComposer } from './commands';

const handlersComposer = new Composer();

handlersComposer.use(commandComposer);

export { handlersComposer };
