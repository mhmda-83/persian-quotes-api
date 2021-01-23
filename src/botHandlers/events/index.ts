import { Composer } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';
import { translateHandler } from './translate';

const eventComposer = new Composer<Context>();
eventComposer.on('text', translateHandler);

export { eventComposer };
