import express, { Express } from 'express';

import { createTelegrafBot } from './bot';
import { getConfig } from './config';

const config = getConfig();
const app: Express = express();

const bot = createTelegrafBot(config.botToken);
if (config.isProduction) app.use(bot.webhookCallback(config.webhookPath));
else bot.launch();
