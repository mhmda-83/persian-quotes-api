import { Composer } from 'telegraf';

import { translateHandler } from './translate';

const commandComposer = new Composer();
commandComposer.command('/translate', translateHandler);

export { commandComposer };
