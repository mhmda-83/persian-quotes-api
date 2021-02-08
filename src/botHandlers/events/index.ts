import { Composer } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';
import { startHandler } from './start';
import { translateHandler } from './translate';
import { translationVerification } from './translationVerification';

const eventComposer = new Composer<Context>();

eventComposer.start(startHandler);
eventComposer.on('text', translateHandler);
eventComposer.on('callback_query', translationVerification);

export { eventComposer };
