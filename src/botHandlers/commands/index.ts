import { Composer } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';
import { cancelHandler } from './cancel';
import { translateHandler } from './translate';

const commandComposer = new Composer<Context>();

commandComposer.command('/cancel', cancelHandler);
commandComposer.command('/translate', translateHandler);

export { commandComposer };
