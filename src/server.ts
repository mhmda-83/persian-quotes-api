import { Container } from 'typescript-ioc';

import { ExpressApp } from './app';
import { createContainer } from './config/container';
import { sampleRecords } from './data/quoteSamples';

Container.configure(...createContainer());

const app = new ExpressApp();

app.init({ seedingData: sampleRecords });
app.listen();
