import { Composer } from 'telegraf-ts';

import { Context } from '../../infra/bot/context';
import { translateHandler } from './translate';
import { translationVerification } from './translationVerification';

const eventComposer = new Composer<Context>();

eventComposer.on('text', translateHandler);
eventComposer.on('callback_query', translationVerification);

export { eventComposer };
