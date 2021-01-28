import { Container } from 'typescript-ioc';

import { ExpressApp } from './app';
import { TelegrafBot } from './bot';
import { getConfig } from './config';
import { createContainer } from './config/container';

Container.configure(...createContainer());

const app = new ExpressApp();
const bot = new TelegrafBot();
const config = getConfig();

if (config.isProduction) app.useMiddleware(bot.lunchUsingWebhook());
else bot.launchUsingPooling();
