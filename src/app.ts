import express, { Express } from 'express';

import { createTelegrafBot } from './bot';
import { getConfig } from './config';
import { Context } from './infra/bot/TelegrafContext';

const config = getConfig();
const app: Express = express();

const bot = createTelegrafBot(config.botToken, { contextType: Context });

if (config.isProduction) app.use(bot.webhookCallback(config.webhookPath));
else bot.launch();
