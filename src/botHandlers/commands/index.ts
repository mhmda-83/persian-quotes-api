import { Composer } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';
import { translateHandler } from './translate';

const commandComposer = new Composer<Context>();
commandComposer.command('/translate', translateHandler);

export { commandComposer };
