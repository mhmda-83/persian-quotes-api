import express, { Express } from 'express';

import { createTelegrafBot } from './bot';
import { getConfig } from './config';
import authorRouter from './routers/author';
import categoryRouter from './routers/category';
import quoteRouter from './routers/quote';

const config = getConfig();
const app: Express = express();

const bot = createTelegrafBot(config.botToken);
if (config.isProduction) app.use(bot.webhookCallback(config.webhookPath));
else bot.launch();

app.use('/api/v1/quote', quoteRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/author', authorRouter);
